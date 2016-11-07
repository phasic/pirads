import {Component} from '@angular/core';
import {DataService} from "../../services/data.service";
import {TranslateService} from "ng2-translate";
import {PageController} from "../../services/page.controller";

@Component({
  selector: 'map-component',
  templateUrl: '../../templates/map/map.template.html'
})
export class MapComponent{
  constructor(private dataservice:DataService, private pagectrl: PageController, private translate: TranslateService){
  }
  private region: string;
  private level: string;
  private side: string;
  keyPressHandler(event: any): void{
    this.pagectrl.hotKeys(event.keyCode);
  }
  leftClickHandler(event: any): void{
    [this.region, this.side, this.level] = event.srcElement.getAttribute("title").split("_");
    this.pagectrl.selectedentry = {
      region: this.region,
      level: this.level,
      side: this.side
    };
    this.addtoTable();
  }
  rightClickHandler(): void{
    [this.region, this.side, this.level] = event.srcElement.getAttribute("title").split("_");
    this.pagectrl.selectedentry = {
      region: this.region,
      level: this.level,
      side: this.side
    };
    this.addFinding();
  }
  scrollHandler(event: any): void{
    this.pagectrl.adjustScore(event.deltaY);
  }
  addtoTable(): void{
    let [foundentry, i] = this.dataservice.findEntry(this.region, this.level, this.side);
    if(!foundentry){
      this.dataservice.getData().push({
        region: this.region,
        level: this.level,
        side: this.side,
        findings: [{
          T2: 'x',
          DWI: 'x',
          DCE: 'x',
          PIRADS: 'x',
          volume: 0,
          comment: '',
        }],
        index: i
      });
      this.dataservice.setMethod('T2');
    }
    this.dataservice.setFindingsIndex(0);
    this.pagectrl.highlightEntry(this.region, this.level, this.side);
  };
  addFinding(): void{
    let confirmstring: any = this.translate.get("TABLE.DIALOG");
    let [foundentry, i] = this.dataservice.findEntry(this.region, this.level, this.side);
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
    else {
      this.addtoTable();
    }
    this.pagectrl.highlightEntry(this.region, this.level, this.side);
    event.preventDefault();
    event.stopPropagation();
  }
}


