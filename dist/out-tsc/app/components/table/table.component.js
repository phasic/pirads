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
var data_service_1 = require("../../services/data.service");
var ng2_translate_1 = require("ng2-translate");
var page_controller_1 = require("../../services/page.controller");
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
var TableComponent = (function () {
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
    function TableComponent(dataservice, pagectrl, translate) {
        var _this = this;
        this.dataservice = dataservice;
        this.pagectrl = pagectrl;
        this.translate = translate;
        /**
         * Array containing the different kinds of zones (region, level, side).
         *
         * This is used in the HTML page to iterate over, saves a lot of space, also are these strings used for translations.
         * @type {(string|string|string)[]}
         */
        this.zones = ['region', 'level', 'side'];
        /**
         * Array containing the different element that use a score (the 3 methods + pirads).
         *
         * This is used in the HTML page to iterate over, saves a lot of space.
         * @type {(string|string|string|string)[]}
         */
        this.columns = ['T2', 'DWI', 'DCE', 'PIRADS'];
        /**
         * Array containing the different possibilities of scores for every method.
         * @type {{T2: (string|string|string|string|string|string)[]; DWI: (string|string|string|string|string|string)[]; DCE: (string|string|string)[]}}
         */
        this.scorearray = {
            'T2': ['1', '2', '3', '4', '5', 'x'],
            'DWI': ['1', '2', '3', '4', '5', 'x'],
            'DCE': ['-', '+', 'x']
        };
        /**
         * Variable that contains what column we want to sort, and if we want to do it ascending or descending
         * @type {{column: string; descending: boolean}}
         */
        this.sort = {
            column: '',
            descending: false
        };
        //bind the dataervice data to this.data
        this.data = dataservice.getData();
        //wait 1ms
        setTimeout(function () {
            //get the translation of SORT BY
            _this.sorttitle = translate.get("TABLE.SORT BY");
            //set the sort variable
            _this.sort = {
                column: _this.sorttitle.value,
                descending: false
            };
        });
    }
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
    TableComponent.prototype.badgeStyle = function (value, method, ifinding) {
        if (method == this.dataservice.getMethod() && ifinding == this.dataservice.getFindingsIndex()) {
            return {
                // 'background-color': this.backgroundColor(value),
                'border-style': 'solid',
                'border-color': 'lightblue',
            };
        }
        else {
            return {};
        }
    };
    /**
     * Used to return a color depending on a method score, this isn't used anymore since we use a dark theme.
     *
     * We'll keep it here if cunstom colors are needed later on in a light theme
     * @param value
     * @returns {any|string}
     */
    TableComponent.prototype.backgroundColor = function (value) {
        return {
            '1': 'white',
            '2': 'green',
            '3': 'blue',
            '4': 'orange',
            '5': 'red',
            'x': 'grey',
            '+': 'red',
            '-': 'green'
        }[value] || 'grey';
    };
    ;
    /**
     * Every time a keyup event is called on the volume input box, we call this function, get the volume and the location of the input box (entry index and findings index),
     * and bind that value to the DataService
     * @param volume  The typed in volume from the input box
     * @param ientry  The index of the entry
     * @param ifinding The index of the finding
     */
    TableComponent.prototype.setVolume = function (volume, ientry, ifinding) {
        this.dataservice.getFindings(ientry)[ifinding].volume = volume;
    };
    /**
     * Every time a keyup event is called on the comment input box, we call this function, get the volume and the location of the input box (entry index and findings index),
     * and bind that value to the DataService
     * @param comment  The typed in comment from the input box
     * @param ientry  The index of the entry
     * @param ifinding The index of the finding
     */
    TableComponent.prototype.setComment = function (comment, ientry, ifinding) {
        this.dataservice.getFindings(ientry)[ifinding].comment = comment;
    };
    /**
     * If we click the cross sign on an entry, we remove it from the dataservice.
     * @param index  The index of the entry in the DataService.
     */
    TableComponent.prototype.removeRow = function (index) {
        this.dataservice.getData().splice(index, 1);
    };
    /**
     * If we open the dropdown menu to sort the table, and we click an element of which we want to sort, this function gets called.
     * If the passed argument, columnName, is already selected. We reverse the sortorder. If the columnName is not the same as the selected sort column,
     * set columnName as the sort column, and sort ascending by default
     *
     * After the sort column is determined, change the sort title to the name of this column.
     * @param columnName String containing the name of the column we want to sort
     */
    TableComponent.prototype.clickSort = function (columnName) {
        //check if the columName is already selected as sort column, if so: reverse sort order. If not: set it as sort column and sort ascending
        this.sort = (this.sort.column == columnName) ? { column: columnName, descending: !this.sort.descending } : { column: columnName, descending: false };
        //change the sort title
        this.sorttitle = this.translate.get("TABLE." + columnName.toLocaleUpperCase());
    };
    /**
     * Converts the column name on which we want to sort. If we want to sort descending, we need to place a '-' before the column name, this function does that.
     * @returns {string}  Returns the column name on which we want to sort, with a '-' in front of it, whether or not we want to sort descending
     */
    TableComponent.prototype.convertSorting = function () {
        return this.sort.descending ? '-' + this.sort.column : this.sort.column;
    };
    /**
     * When we click on the table, we call this function. It takes the clicked row by region, level and side.
     * Sets the selectedentry in the pagecontroller to this sector, and highlights this entry.
     * @param region  Region of the clicked row in the table.
     * @param level Level of the clicked row in the table.
     * @param side Side of the clicked row in the table.
     */
    TableComponent.prototype.tableClickHandler = function (region, level, side) {
        //set the selected entry to the clicked row
        this.pagectrl.selectedentry = { region: region, level: level, side: side };
        //highlight the selection
        this.pagectrl.highlightEntry(region, level, side, true);
    };
    /**
     * When we right click a table row, we get the region, level and side of that row.
     * Add a finding to that entry. Don't add anything to the table if we there are already 9 findings.
     * If there are more than 4 findings, ask for confirmation. Less than 4 findings, just add the finding to the table
     * @param region  Region of the clicked row in the table.
     * @param level Level of the clicked row in the table.
     * @param side Side of the clicked row in the table.
     */
    TableComponent.prototype.tableRightClickHandler = function (region, level, side) {
        //this is the string you'll see when you try to add more than 4 findings to the table
        var confirmstring = this.translate.get("TABLE.DIALOG");
        //check if an entry already exists with this region, level and side
        var _a = this.dataservice.findEntry(region, level, side), foundentry = _a[0], i = _a[1];
        //if it does
        if (foundentry) {
            //get the amount of findings we got for this region
            var length_1 = this.dataservice.getData()[i].findings.length;
            //if it's more than 9
            if (length_1 >= 9) {
                //catch the right click
                event.preventDefault();
                event.stopPropagation();
                //and do nothing
                return;
            }
            //if its between 4 and 9, we ask for confirmation, or if its below 4
            if ((length_1 >= 4 && window.confirm(confirmstring.value)) || (length_1 < 4)) {
                //add the sector to the data
                this.dataservice.getData()[i].findings.push({
                    T2: 'x',
                    DWI: 'x',
                    DCE: 'x',
                    PIRADS: 'x',
                    volume: null,
                    comment: ''
                });
                //set the findings index to the new finding
                this.dataservice.setFindingsIndex(this.dataservice.getData()[i].findings.length - 1);
            }
        }
        //highlight the sector in the table
        this.pagectrl.highlightEntry(region, level, side);
        //catch the right click
        event.preventDefault();
        event.stopPropagation();
    };
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
    TableComponent.prototype.setScore = function (method, score, ifinding) {
        //get the region, level and side of the selected entry
        var _a = this.pagectrl.selectedentry, region = _a.region, level = _a.level, side = _a.side;
        //set the score in the dataservice
        this.dataservice.setScore(region, level, side, ifinding, method, score);
        //get the index in the dataservice of the entry
        var idata = this.dataservice.findEntry(region, level, side)[1];
        //set the findings index on the passed ifinding
        this.dataservice.setFindingsIndex(ifinding);
        //set the method on the passed method, a highlight will be generated
        this.dataservice.setMethod(method);
        //calculate the pirads again
        this.dataservice.calcPirads(region, idata);
        //cathc the click before it passes to the parent element (the row)
        event.stopPropagation();
    };
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
    TableComponent.prototype.checkIfSelectedEntry = function (region, level, side) {
        return (this.pagectrl.selectedentry.region == region) &&
            (this.pagectrl.selectedentry.level == level) &&
            (this.pagectrl.selectedentry.side == side);
    };
    TableComponent = __decorate([
        core_1.Component({
            selector: 'table-component',
            templateUrl: '../../templates/table/table.template.html'
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, page_controller_1.PageController, ng2_translate_1.TranslateService])
    ], TableComponent);
    return TableComponent;
}());
exports.TableComponent = TableComponent;
//# sourceMappingURL=D:/Users/EYWGN/Documents/Masterproef/agility_schedar/pirads/src/app/components/table/table.component.js.map