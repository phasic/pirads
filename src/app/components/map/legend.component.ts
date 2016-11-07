import { Component }      from '@angular/core';
import {TranslateService} from "ng2-translate";

@Component({
    selector: 'legend-component',
    templateUrl: '../../templates/map/legend.template.html'
})
export class LegendComponent{
    constructor(private translate: TranslateService){
        this.translate = translate;
    }

  private categories: Array<string> = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'];


}
