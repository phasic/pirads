"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ng2_translate_1 = require("ng2-translate");
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
var LegendComponent = (function () {
    /**
     * The constructor will initialize the TranslateService as 'translate'. This value will be used to access the i18n translation files, and get the correspoding input values from the json files.
     *
     * The TranslateService will look into the correct json file (depending on the language) and gets the LEGEND.ONE entry, returns a string.
     *
     * @param translate This variable contains the TranslateService, and will be used to translate the placeholder values to the right language.
     */
    function LegendComponent(translate) {
        this.translate = translate;
        /**
         * This string contains the placeholder values for the menu, for each possible PIRADS score, except the 'X' value.
         * These values will be translated to a more meaningful string by the TranslateService
         * @type {(string|string|string|string|string)[]}
         */
        this.categories = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'];
        this.translate = translate;
    }
    LegendComponent = __decorate([
        core_1.Component({
            selector: 'legend-component',
            templateUrl: '../../templates/map/legend.template.html'
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService])
    ], LegendComponent);
    return LegendComponent;
}());
exports.LegendComponent = LegendComponent;
//# sourceMappingURL=D:/Users/EYWGN/Documents/Masterproef/agility_schedar/pirads/src/app/components/map/legend.component.js.map