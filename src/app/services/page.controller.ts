import {Injectable} from "@angular/core";
import {DataService} from "./data.service";
import {HotkeyService} from "./hotkey.service";
@Injectable()
export class PageController {
  get selectedentry(): {region: string; level: string; side: string} {
    return this._selectedentry;
  }

  set selectedentry(value: {region: string; level: string; side: string}) {
    this._selectedentry = value;
  }

  constructor( private dataservice: DataService, private hotkeyservice: HotkeyService) {
  }
  private findingsindex: number;
  private method: string = '';
  private _selectedentry: {
    region: string,
    level: string,
    side: string};
  hotKeys(keycode: number): void{
    let hotkeys: any = this.hotkeyservice.hotkeys;                  //get the hotkeys from the hotkey service
    this.findingsindex = parseInt({   //ugly hack so the 0 doesnt trigger the || (convert to string, and then parse it to a number again
        [hotkeys.finding.one] : '0',
        [hotkeys.finding.two] : '1',
        [hotkeys.finding.three] : '2',
        [hotkeys.finding.four] : '3',
        [hotkeys.finding.five] : '4',
        [hotkeys.finding.six] : '5',
        [hotkeys.finding.seven] : '6',
        [hotkeys.finding.eight] : '7',
        [hotkeys.finding.nine] : '8'
      }[keycode] || this.dataservice.getFindingsIndex().toString());
    this.dataservice.setFindingsIndex(this.findingsindex);

    this.method = {
        [hotkeys.method.one]  : 'T2',
        [hotkeys.method.two]  : 'DWI',
        [hotkeys.method.three]  : 'DCE'
      }[keycode] || this.dataservice.getMethod();
    this.dataservice.setMethod(this.method);

    if(keycode == (hotkeys.scoring.plus + 64)){
      this.adjustScore(-100);
    }
    else if(keycode == (hotkeys.scoring.minus + 64)){
      this.adjustScore(100);
    }
    else if(keycode == 37){
      this.adjustMethod('left');
    }
    else if(keycode == 39){
      this.adjustMethod('right');
    }
    else if(keycode == 38) {
      this.adjustFinding('up');
    }
    else if(keycode == 40){
      this.adjustFinding('down');
    }
  }

  adjustFinding(direction: string): void{
    let findingsindex: number = this.dataservice.getFindingsIndex();
    let { region: region, level: level, side: side} = this.selectedentry;
    if(direction == 'up'){
      if(findingsindex > 0){
        this.dataservice.setFindingsIndex(--findingsindex);
      }
      else{
        let i: number = this.dataservice.findEntry(region,level,side)[1];
        findingsindex = this.dataservice.getData()[i].findings.length - 1;
        this.dataservice.setFindingsIndex(findingsindex);
      }
    }
    else if(direction == 'down'){
      let i: number = this.dataservice.findEntry(region,level,side)[1];
      let findingslength: number = this.dataservice.getData()[i].findings.length;
      if(findingsindex == (findingslength -1)){
        this.dataservice.setFindingsIndex(0);
      }
      else{
        this.dataservice.setFindingsIndex(++findingsindex);
      }
    }
  }
  adjustScore(delta: number): void{
    try {
      let x: any;
      let { region: region, level: level, side: side} = this.selectedentry;
      let method: string = this.dataservice.getMethod();
      let [foundentry, i] = this.dataservice.findEntry(region,level,side);

      let scorearray: Array<string> = {
        'T2' : ['1', '2', '3', '4', '5', 'x'],
        'DWI' : ['1', '2', '3', '4', '5', 'x'],
        'DCE' : ['-', '+', 'x']
      }[method];
      let index: number = scorearray.indexOf(this.dataservice.getData()[i].findings[this.dataservice.getFindingsIndex()][method]);
      if (delta > 0 && index-- <= 0) {
        index = scorearray.length - 1;
      }
      else if (delta < 0 && ++index == scorearray.length) {
        index = 0;
      }
      this.dataservice.getData()[i].findings[this.dataservice.getFindingsIndex()][method] = scorearray[index];
      this.dataservice.calcPirads(region,i);
      event.preventDefault();
      event.stopPropagation();
    }
    catch(e){
      if(e instanceof TypeError){} //We're scrolling over a field that's not in the data, that's okay
      else{console.log(e);}
    }
  }
  adjustMethod(direction: string): void{
    let methods: Array<string> = ['T2', 'DWI', 'DCE']; //this wil be used for the left right arrows
    let methodindex: number = methods.indexOf(this.dataservice.getMethod());

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
    this.dataservice.setMethod(methods[methodindex]);
  }
  highlightEntry(region: string, level: string, side: string, fromtable?: boolean): void{
    setTimeout(() => {
      let element: any = document.getElementById(region + level + side);
      if(!fromtable) {      //we don't want to scroll into view if we click the table, the entry is already in view
        element.scrollIntoView();
      }
      let sibling: any = element.parentElement.childNodes[2];
      let classname: string;
      for( ; sibling; sibling = sibling.nextSibling){
        let child: any;
        if( (child = sibling.childNodes[1]) && sibling != element) {
          classname = child.className.replace("panel-primary", "panel-info");
          child.setAttribute('class', classname);
        }
      }
      classname = element.childNodes[1].className.replace("panel-info", "panel-primary");
      element.childNodes[1].setAttribute('class', classname);
    });
  }

}
