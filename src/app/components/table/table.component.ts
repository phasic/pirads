import { Component }      from '@angular/core';
import { DataService } from "../../services/data.service";
import {TranslateService} from "ng2-translate";
import {PageController} from "../../services/page.controller";
@Component({
  selector: 'table-component',
  templateUrl: '../../templates/table/table.template.html'
})
export class TableComponent{
  private zones: Array<string> = ['region','level', 'side'];
  private columns: Array<string> = ['T2', 'DWI', 'DCE', 'PIRADS'];
  private  scorearray: any = {
    'T2' : ['1', '2', '3', '4', '5', 'x'],
    'DWI' : ['1', '2', '3', '4', '5', 'x'],
    'DCE' : ['-', '+', 'x']
  };
  private sort: any = {
    column: '',
    descending: false
  };
  private data: any;
  private sorttitle: any;
  constructor(private dataservice:DataService, private pagectrl: PageController, private translate: TranslateService){
    this.data = dataservice.getData();
    setTimeout(() => {
      this.sorttitle = translate.get("TABLE.SORT BY");
      this.sort = {
        column: this.sorttitle.value,
        descending: false
      }
    });

  }
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
  //we don't use this anymore, because the colors are too bright
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
  setVolume(volume: string, ientry: number, ifinding: number): void{
    this.dataservice.getFindings(ientry)[ifinding].volume = volume;
  }
  setComment(comment: string, ientry: number, ifinding: number): void{
    this.dataservice.getFindings(ientry)[ifinding].comment = comment;
  }
  removeRow(index){
    this.dataservice.getData().splice(index, 1);
  }
  clickSort(columnName: string): void{

    this.sort = (this.sort.column == columnName)? { column: columnName, descending: !this.sort.descending}: {column: columnName,descending: false};
    this.sorttitle = this.translate.get("TABLE." + columnName.toLocaleUpperCase());
  }

  convertSorting(): string{
    return this.sort.descending ? '-' + this.sort.column : this.sort.column;
  }

  tableClickHandler(region: string, level: string, side: string){
    this.pagectrl.selectedentry = {region: region, level: level, side: side};
    // this.dataservice.setMethod('T2');
    // this.dataservice.setFindingsIndex(0);
    this.pagectrl.highlightEntry(region, level, side, true);
  }

  tableRightClickHandler(region: string, level: string, side: string){
    let confirmstring: any = this.translate.get("TABLE.DIALOG");
    let [foundentry, i] = this.dataservice.findEntry(region, level, side);
    if(foundentry){
      let length: number = this.dataservice.getData()[i].findings.length;
      if(length >= 9){
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if ((length >= 4 && window.confirm(confirmstring.value)) || (length < 4)) {
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
        this.dataservice.setFindingsIndex(this.dataservice.getData()[i].findings.length-1);
      }
    }
    this.pagectrl.highlightEntry(region, level, side);
    event.preventDefault();
    event.stopPropagation();
  }
  setScore(method: string, score: string, ifinding: number){
    let { region: region, level: level, side: side} = this.pagectrl.selectedentry;
    this.dataservice.setScore(region, level, side, ifinding, method, score);
    let idata: number = this.dataservice.findEntry(region,level,side)[1];
    this.dataservice.setFindingsIndex(ifinding);
    this.dataservice.setMethod(method);
    this.dataservice.calcPirads(region, idata);
    event.stopPropagation();
  }

  checkIfSelectedEntry(region: string, level: string, side: string): boolean{
    return (this.pagectrl.selectedentry.region == region) &&
      (this.pagectrl.selectedentry.level == level) &&
      (this. pagectrl.selectedentry.side == side);
  }

  test(){
    console.log(this.dataservice.getMethod());
  }
}



