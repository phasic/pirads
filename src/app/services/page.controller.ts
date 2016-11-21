import {Injectable} from "@angular/core";
import {DataService} from "./data.service";
import {HotkeyService} from "./hotkey.service";
/**
 * Service that handles the manipulation of the scoring. i.e. navigation through the table with hotkeys, giving methods a score and highlighting the rows.
 */
@Injectable()
export class PageController {
  /**
   * Returns the region, level and side of the selected entry.
   * @returns {{region: string, level: string, side: string}}
   */
  get selectedentry(): {region: string; level: string; side: string} {
    return this._selectedentry;
  }

  /**
   * Sets the region, level and side of the selected entry.
   * @param value
   */
  set selectedentry(value: {region: string; level: string; side: string}) {
    this._selectedentry = value;
  }

  /**
   * The constructor will initialize the dataservice and the hotkeyservice.
   * @param dataservice This service contains all the data. This is used to set and get the correct data we want.
   * @param hotkeyservice The hotkeyService contains an array with all the hotkeys.
   */
  constructor( private dataservice: DataService, private hotkeyservice: HotkeyService) {
  }

  /**
   * The findings index. (an entry can have multiple findings, this index points to the right finding)
   */
  private findingsindex: number;
  /**
   * The selected method, initialized on no method selected
   * @type {string}
   */
  private method: string = '';
  /**
   * The selectedentry, defined by a region, level and side.
   */
  private _selectedentry: {
    region: string,
    level: string,
    side: string};

  /**
   * When a key is pressed anywhere in the window, this function will get called. It takes the keycode of the pressed number,
   * and checks if that key is defined by the hotkeyservice. If it is: do the corresponding action (navigating through scores, giving scores, changing methods)
   * @param keycode Keycode of the pressed key.
   */
  hotKeys(keycode: number): void {
    //when we're typing a comment in the comment textfield, disable the hotkeys
    if (!(document.activeElement.nodeName == 'TEXTAREA' || document.activeElement.nodeName == 'INPUT')) {
      //get the hotkeys array
      let hotkeys: any = this.hotkeyservice.hotkeys;                  //get the hotkeys from the hotkey service
      //set the right findings index
      this.findingsindex = parseInt({   //ugly hack so the 0 doesnt trigger the || (convert to string, and then parse it to a number again
          [hotkeys.finding.one]: '0',
          [hotkeys.finding.two]: '1',
          [hotkeys.finding.three]: '2',
          [hotkeys.finding.four]: '3',
          [hotkeys.finding.five]: '4',
          [hotkeys.finding.six]: '5',
          [hotkeys.finding.seven]: '6',
          [hotkeys.finding.eight]: '7',
          [hotkeys.finding.nine]: '8'
        }[keycode] || this.dataservice.getFindingsIndex().toString());
      this.dataservice.setFindingsIndex(this.findingsindex);
      //set the righ method
      this.method = {
          [hotkeys.method.one]: 'T2',
          [hotkeys.method.two]: 'DWI',
          [hotkeys.method.three]: 'DCE'
        }[keycode] || this.dataservice.getMethod();
      this.dataservice.setMethod(this.method);

      //if we clicked +
      if (keycode == (hotkeys.scoring.plus + 64)) {
        this.adjustScore(-100);
      }
      //if we clicked -
      else if (keycode == (hotkeys.scoring.minus + 64)) {
        this.adjustScore(100);
      }
      //left arrow key
      else if (keycode == 37) {
        this.adjustMethod('left');
      }
      //right arraw key
      else if (keycode == 39) {
        this.adjustMethod('right');
      }
      //up arrow key
      else if (keycode == 38) {
        this.adjustFinding('up');
        event.preventDefault();
      }
      //down arrow key
      else if (keycode == 40) {
        this.adjustFinding('down');
        event.preventDefault();
      }

    }

  }

  /**
   * When we navigate with the arrow keys we want to navigate through the the findings of one entry, or change the selected method.
   *
   * Left or right: navigate through methods.
   *
   * Up or down: navigate through findings of an entry.
   *
   *
   * @param direction Up, down, left or right
   */
  adjustFinding(direction: string): void{
    //get the findingsindex
    let findingsindex: number = this.dataservice.getFindingsIndex();
    //get the selected entry
    let { region: region, level: level, side: side} = this.selectedentry;
    if(direction == 'up'){
      //move one finding up
      if(findingsindex > 0){
        this.dataservice.setFindingsIndex(--findingsindex);
      }
      //if were at the top, move to the last finding
      else{
        let i: number = this.dataservice.findEntry(region,level,side)[1];
        findingsindex = this.dataservice.getData()[i].findings.length - 1;
        this.dataservice.setFindingsIndex(findingsindex);
      }
    }
    else if(direction == 'down'){
      let i: number = this.dataservice.findEntry(region,level,side)[1];
      let findingslength: number = this.dataservice.getData()[i].findings.length;
      //if were at the last finding, set the finding to the first one
      if(findingsindex == (findingslength -1)){
        this.dataservice.setFindingsIndex(0);
      }
      //else move to the next finding
      else{
        this.dataservice.setFindingsIndex(++findingsindex);
      }
    }
  }

  /**
   * This function gets called when we want to change the score of the selected method.
   * The delta indicates an increment or a decrement of the score.
   *
   * Delta < 0 : score ++
   *
   * Delta > 0 :  score --
   * @param delta Was originally the scroll direction of the mouse, we kept the same system. but we assign -100 or +100 when we call the function.
   */
  adjustScore(delta: number): void{
    try {
      //get the selectedentry
      let { region: region, level: level, side: side} = this.selectedentry;
      //get the selected method
      let method: string = this.dataservice.getMethod();
      //find the right entry
      let [foundentry, i] = this.dataservice.findEntry(region,level,side);
      //get the score array of the selected method
      let scorearray: Array<string> = {
        'T2' : ['1', '2', '3', '4', '5', 'x'],
        'DWI' : ['1', '2', '3', '4', '5', 'x'],
        'DCE' : ['-', '+', 'x']
      }[method];
      //get the index
      let index: number = scorearray.indexOf(this.dataservice.getData()[i].findings[this.dataservice.getFindingsIndex()][method]);
      //up or down?
      if (delta > 0 && index-- <= 0) {
        index = scorearray.length - 1;
      }
      else if (delta < 0 && ++index == scorearray.length) {
        index = 0;
      }
      //assign the correct element from the scorearray to the dataservice
      this.dataservice.getData()[i].findings[this.dataservice.getFindingsIndex()][method] = scorearray[index];
      //recalculate the pirads score
      this.dataservice.calcPirads(region,i);
      //catch the scroll, OLD
      event.preventDefault();
    }
      //catch the scroll errors, when we scroll over a sector that's not in the data
    catch(e){
      if(e instanceof TypeError){} //We're scrolling over a field that's not in the data, that's okay
      else{console.log(e);}
    }
  }

  /**
   * When we press the left or right arrow keys, we change the method (T2, DWI, DCE).
   * @param direction Left or right.
   */
  adjustMethod(direction: string): void{
    //the possible methods
    let methods: Array<string> = ['T2', 'DWI', 'DCE']; //this wil be used for the left right arrows
    //see what method were using now
    let methodindex: number = methods.indexOf(this.dataservice.getMethod());
    //adjust is accordingly
    methodindex = {
        'left': () => {
          if(--methodindex < 0){
            methodindex = methods.length -1;
          }
          return methodindex;
        },
        'right': () => {
          if(++methodindex == methods.length){
            methodindex = 0;
          }
          return methodindex;
        }
      }[direction]() || methodindex;
    //and set the method to the newly 'calculated' one
    this.dataservice.setMethod(methods[methodindex]);
  }

  /**
   * When we click a sector on the map, or click a row on the table, we highlight that row with a lighter color.
   * So the user knows in which row he is working.
   *
   * We get the right row, get all the siblings, and replace the style that renders the highlight with the default style.
   *
   * Now we replace the original style of the selected row, with the highlight style.
   *
   * @param region  The region of the entry we want to highlight.
   * @param level The level of the entry we want to highlight.
   * @param side The side of the entry we want to highlight.
   * @param fromtable Did we click on a sector, or just on a row in the table. If we clicked on a row in the table, we don't want the table to scroll the row to the top of the page.
   */
  highlightEntry(region: string, level: string, side: string, fromtable?: boolean): void{
    //wait 1ms
    setTimeout(() => {
      //get the right row
      let element: any = document.getElementById(region + level + side);
      //we didn't click on the table
      if(!fromtable) {      //we don't want to scroll into view if we click the table, the entry is already in view
        //scroll the selected row to the top of the page
        element.scrollIntoView();
      }
      //get the siblings
      let sibling: any = element.parentElement.childNodes[2];
      //stores the classname
      let classname: string;
      //run over all sublings
      for( ; sibling; sibling = sibling.nextSibling){
        let child: any;
        //get the right panel
        if( (child = sibling.childNodes[1]) && sibling != element) {
          //replace the style with a default one
          classname = child.className.replace("panel-primary", "panel-info");
          //attach the attribute to the chil
          child.setAttribute('class', classname);
        }
      }
      //replace the style with the highlighto ne
      classname = element.childNodes[1].className.replace("panel-info", "panel-primary");
      //attach it to the selected row
      element.childNodes[1].setAttribute('class', classname);
    });
  }
}
