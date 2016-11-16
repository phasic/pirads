import { Component }      from '@angular/core';
import {TranslateService} from "ng2-translate";
/**
 * This component contains the info bar, explaining the PIRADS score.
 *
 * The component will use placeholder values in the view (ONE, TWO, THREE, ...), these values will be used by the TranslateService.
 * The TranslateService looks at those values, and takes the corresponding values from the i18n translation files.
 * The translation happens at runtime.
 *
 *       selector: 'legend-component'
 *
 *       templateUrl: '../../templates/map/legend.template.html'
 */
@Component({
    selector: 'legend-component',
    templateUrl: '../../templates/map/legend.template.html'
})
export class LegendComponent{
  /**
   * The constructor will initialize the TranslateService as 'translate'. This value will be used to access the i18n translation files, and get the correspoding input values from the json files.
   *
   * The TranslateService will look into the correct json file (depending on the language) and gets the LEGEND.ONE entry, returns a string.
   *
   * @param translate This variable contains the TranslateService, and will be used to translate the placeholder values to the right language.
   */
    constructor(private translate: TranslateService){
        this.translate = translate;
    }

  /**
   * This string contains the placeholder values for the menu, for each possible PIRADS score, except the 'X' value.
   * These values will be translated to a more meaningful string by the TranslateService
   * @type {(string|string|string|string|string)[]}
   */
  private categories: Array<string> = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'];


}
