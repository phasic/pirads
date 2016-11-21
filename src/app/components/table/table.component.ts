import { Component }      from '@angular/core';
import { DataService } from "../../services/data.service";
import {TranslateService} from "ng2-translate";
import {PageController} from "../../services/page.controller";
/**
 * This component contains the table of the PIRADS entries in the data.
 * The table shows every sector entry with their findings and corresponding scores.
 *
 * When you click a sector entry in the table, that row will get highlighted, so you can adjust the score and navigate through the findings.
 *
 * Right click on a row will add another finding to that entry.
 *
 *
 * By default: use + and - to increment and decrement the score, the arrow key will navigate through the findings of that entry,
 * and adjust the selected method.
 *
 *
 * Instead of using keyboard keys, you can hover over a score of the selected entry, and adjust it via a selection menu.
 *
 * There is an option to remove findings of an entry.
 *
 *
 * In the left upper corner of the table you can select how you want to sort the table (by region, level or side).
 *
 *        selector: 'table-component'
 *
 *        templateUrl: '../../templates/table/table.template.html'
 *
 */
@Component({
  selector: 'table-component',
  templateUrl: '../../templates/table/table.template.html'
})
export class TableComponent{
  /**
   * The contructor will initialize the following: dataService, pageController, TranslateService
   *
   * the data from the dataservice will be bound to the data variable.
   *
   * After a default timeout we will get the translation of the sort title.
   * We will also set the sort variable to a default value.
   *
   * @param dataservice This service contains all the data. This is used to set and get the correct data we want.
   * @param pagectrl  This service contains all the shared functionality. This service mainly handles the hotkeys and adjusting scores/methods/finding (used for navigation through the table)
   * @param translate This variable contains the TranslateService, and will be used to translate the placeholder values to the right language.
   */
  constructor(private dataservice:DataService, private pagectrl: PageController, private translate: TranslateService){
    //bind the dataervice data to this.data
    this.data = dataservice.getData();
    //wait 1ms
    setTimeout(() => {
      //get the translation of SORT BY
      this.sorttitle = translate.get("TABLE.SORT BY");
      //set the sort variable
      this.sort = {
        column: this.sorttitle.value,
        descending: false
      }
    });
  }

  /**
   * Array containing the different kinds of zones (region, level, side).
   *
   * This is used in the HTML page to iterate over, saves a lot of space, also are these strings used for translations.
   * @type {(string|string|string)[]}
   */
  private zones: Array<string> = ['region','level', 'side'];
  /**
   * Array containing the different element that use a score (the 3 methods + pirads).
   *
   * This is used in the HTML page to iterate over, saves a lot of space.
   * @type {(string|string|string|string)[]}
   */
  private columns: Array<string> = ['T2', 'DWI', 'DCE', 'PIRADS'];
  /**
   * Array containing the different possibilities of scores for every method.
   * @type {{T2: (string|string|string|string|string|string)[]; DWI: (string|string|string|string|string|string)[]; DCE: (string|string|string)[]}}
   */
  private  scorearray: any = {
    'T2' : ['1', '2', '3', '4', '5', 'x'],
    'DWI' : ['1', '2', '3', '4', '5', 'x'],
    'DCE' : ['-', '+', 'x']
  };
  /**
   * Variable that contains what column we want to sort, and if we want to do it ascending or descending
   * @type {{column: string; descending: boolean}}
   */
  private sort: any = {
    column: '',
    descending: false
  };
  /**
   * Contains the data of the DataService
   */
  private data: any;
  /**
   * String that contains the title we want to show of the sort element.
   * As default we want to show 'Sort by', but when we sort by e.g. region, we want to show the word 'Region'.
   * That string is stored in this variable.
   */
  private sorttitle: any;

  /**
   * Takes the  method and the index of the finding of the element.
   * Compares it to the DataService selected method and findings index. If it's the same, render a small border around the badge.
   *
   * This is used to add some visual feedback on the selected finding and method.
   *
   * Originally colors were used depending on the score (white --> red),
   * these are disabled because were using the dark theme.
   * @param value The score value, originally used to give a color back depending on the score. This isn't used anymore, but still there if custom colors are needed for a light theme.
   * @param method  The method (T2, DWI, DCE) of the element, used to compare it to the selected method of the DataService.
   * @param ifinding The findings index of the element, used to compare it to the selected findings index of the DataService.
   * @returns {any}
   */
  badgeStyle(value: string, method: string, ifinding: number): any{
    if(method == this.dataservice.getMethod() && ifinding == this.dataservice.getFindingsIndex()){
      return {
        // 'background-color': this.backgroundColor(value),
        'border-style': 'solid',
        'border-color': 'lightblue',
        // 'color': this.fontColor(value)
        // 'color': (value == '1')? 'black': 'white'
      }
    }
    else {
      return {
        // 'background-color': this.backgroundColor(value),
        // 'color': this.fontColor(value)
        // 'color': (value == '1') ? 'black' : 'white'
      };
    }
  }

  /**
   * Used to return a color depending on a method score, this isn't used anymore since we use a dark theme.
   *
   * We'll keep it here if cunstom colors are needed later on in a light theme
   * @param value
   * @returns {any|string}
   */
  backgroundColor(value: string): string{
    return {
        '1' : 'white',
        '2' : 'green',
        '3' : 'blue',
        '4' : 'orange',
        '5' : 'red',
        'x' : 'grey',
        '+' : 'red',
        '-' : 'green'
      }[value] || 'grey';
  };

  /**
   * Every time a keyup event is called on the volume input box, we call this function, get the volume and the location of the input box (entry index and findings index),
   * and bind that value to the DataService
   * @param volume  The typed in volume from the input box
   * @param ientry  The index of the entry
   * @param ifinding The index of the finding
   */
  setVolume(volume: string, ientry: number, ifinding: number): void{
    this.dataservice.getFindings(ientry)[ifinding].volume = volume;
  }

  /**
   * Every time a keyup event is called on the comment input box, we call this function, get the volume and the location of the input box (entry index and findings index),
   * and bind that value to the DataService
   * @param comment  The typed in comment from the input box
   * @param ientry  The index of the entry
   * @param ifinding The index of the finding
   */
  setComment(comment: string, ientry: number, ifinding: number): void{
    this.dataservice.getFindings(ientry)[ifinding].comment = comment;
  }

  /**
   * If we click the cross sign on an entry, we remove it from the dataservice.
   * @param index  The index of the entry in the DataService.
   */
  removeRow(index){
    this.dataservice.getData().splice(index, 1);
  }

  /**
   * If we open the dropdown menu to sort the table, and we click an element of which we want to sort, this function gets called.
   * If the passed argument, columnName, is already selected. We reverse the sortorder. If the columnName is not the same as the selected sort column,
   * set columnName as the sort column, and sort ascending by default
   *
   * After the sort column is determined, change the sort title to the name of this column.
   * @param columnName String containing the name of the column we want to sort
   */
  clickSort(columnName: string): void{
    //check if the columName is already selected as sort column, if so: reverse sort order. If not: set it as sort column and sort ascending
    this.sort = (this.sort.column == columnName)? { column: columnName, descending: !this.sort.descending}: {column: columnName,descending: false};
    //change the sort title
    this.sorttitle = this.translate.get("TABLE." + columnName.toLocaleUpperCase());
  }

  /**
   * Converts the column name on which we want to sort. If we want to sort descending, we need to place a '-' before the column name, this function does that.
   * @returns {string}  Returns the column name on which we want to sort, with a '-' in front of it, whether or not we want to sort descending
   */
  convertSorting(): string{
    return this.sort.descending ? '-' + this.sort.column : this.sort.column;
  }

  /**
   * When we click on the table, we call this function. It takes the clicked row by region, level and side.
   * Sets the selectedentry in the pagecontroller to this sector, and highlights this entry.
   * @param region  Region of the clicked row in the table.
   * @param level Level of the clicked row in the table.
   * @param side Side of the clicked row in the table.
   */
  tableClickHandler(region: string, level: string, side: string){
    //set the selected entry to the clicked row
    this.pagectrl.selectedentry = {region: region, level: level, side: side};
    //highlight the selection
    this.pagectrl.highlightEntry(region, level, side, true);
    this.dataservice.setFindingsIndex(0);
    this.dataservice.setMethod('T2');

  }

  /**
   * When we right click a table row, we get the region, level and side of that row.
   * Add a finding to that entry. Don't add anything to the table if we there are already 9 findings.
   * If there are more than 4 findings, ask for confirmation. Less than 4 findings, just add the finding to the table
   * @param region  Region of the clicked row in the table.
   * @param level Level of the clicked row in the table.
   * @param side Side of the clicked row in the table.
   */
  tableRightClickHandler(region: string, level: string, side: string){
    //set the selected entry to the clicked row
    this.pagectrl.selectedentry = {region: region, level: level, side: side};
    //this is the string you'll see when you try to add more than 4 findings to the table
    let confirmstring: any = this.translate.get("TABLE.DIALOG");
    //check if an entry already exists with this region, level and side
    let [foundentry, i] = this.dataservice.findEntry(region, level, side);
    //if it does
    if(foundentry){
      //get the amount of findings we got for this region
      let length: number = this.dataservice.getData()[i].findings.length;
      //if it's more than 9
      if(length >= 9){
        //catch the right click
        event.preventDefault();
        //and do nothing
        return;
      }
      //if its between 4 and 9, we ask for confirmation, or if its below 4
      if ((length >= 4 && window.confirm(confirmstring.value)) || (length < 4)) {
        //add the sector to the data
        this.dataservice.getData()[i].findings.push(
          {
            T2: 'x',
            DWI: 'x',
            DCE: 'x',
            PIRADS: 'x',
            volume: null,
            comment: ''
          }
        );
        //set the findings index to the new finding
        this.dataservice.setFindingsIndex(this.dataservice.getData()[i].findings.length-1);
      }
    }
    //highlight the sector in the table
    this.pagectrl.highlightEntry(region, level, side);
    //catch the right click
    event.preventDefault();
  }

  /**
   * Used to give a score to a method with the mouse.
   * When you hover over a method, a menu shows up with the different possible scores for that method. When you click one of them,
   * this function gets called.
   *
   * setScore gets the method of which the score is given (T2, DWI, DCE), the score itself and the findings index.
   *
   * Get the region, level and side of the selected entry.
   *
   * Sets the passed score in the DataService.
   *
   * Set a highlight on that element.
   *
   * Then we calculate the PIRADS score again to get immediate feedback.
   * @param method  The method of which the score is given
   * @param score The selected score
   * @param ifinding  The findings index
   */
  setScore(method: string, score: string, ifinding: number){
    //get the region, level and side of the selected entry
    let { region: region, level: level, side: side} = this.pagectrl.selectedentry;
    //set the score in the dataservice
    this.dataservice.setScore(region, level, side, ifinding, method, score);
    //get the index in the dataservice of the entry
    let idata: number = this.dataservice.findEntry(region,level,side)[1];
    //set the findings index on the passed ifinding
    this.dataservice.setFindingsIndex(ifinding);
    //set the method on the passed method, a highlight will be generated
    this.dataservice.setMethod(method);
    //calculate the pirads again
    this.dataservice.calcPirads(region, idata);
  }

  /**
   * We only want to be able to get a menu to adjust the score of a method on a row that is selected.
   * So we need to disable those menus in the non-selected rows.
   * We do this by checking the region, level, side of a badge corresponding with a method,
   * and check if that badge is an element of the selected row, if not: disable the menu behind the badge
   * @param region  The region of the row where the badge is in
   * @param level The level of the row where the badge is in
   * @param side The side of the row where the badge is in
   * @returns {boolean} Return true if the badge is in the selected row
   */
  checkIfSelectedEntry(region: string, level: string, side: string): boolean{
    return (this.pagectrl.selectedentry.region == region) &&
      (this.pagectrl.selectedentry.level == level) &&
      (this. pagectrl.selectedentry.side == side);
  }
}



