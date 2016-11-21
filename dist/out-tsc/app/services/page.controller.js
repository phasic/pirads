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
var core_1 = require("@angular/core");
var data_service_1 = require("./data.service");
var hotkey_service_1 = require("./hotkey.service");
/**
 * Service that handles the manipulation of the scoring. i.e. navigation through the table with hotkeys, giving methods a score and highlighting the rows.
 */
var PageController = (function () {
    /**
     * The constructor will initialize the dataservice and the hotkeyservice.
     * @param dataservice This service contains all the data. This is used to set and get the correct data we want.
     * @param hotkeyservice The hotkeyService contains an array with all the hotkeys.
     */
    function PageController(dataservice, hotkeyservice) {
        this.dataservice = dataservice;
        this.hotkeyservice = hotkeyservice;
        /**
         * The selected method, initialized on no method selected
         * @type {string}
         */
        this.method = '';
    }
    Object.defineProperty(PageController.prototype, "selectedentry", {
        /**
         * Returns the region, level and side of the selected entry.
         * @returns {{region: string, level: string, side: string}}
         */
        get: function () {
            return this._selectedentry;
        },
        /**
         * Sets the region, level and side of the selected entry.
         * @param value
         */
        set: function (value) {
            this._selectedentry = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * When a key is pressed anywhere in the window, this function will get called. It takes the keycode of the pressed number,
     * and checks if that key is defined by the hotkeyservice. If it is: do the corresponding action (navigating through scores, giving scores, changing methods)
     * @param keycode Keycode of the pressed key.
     */
    PageController.prototype.hotKeys = function (keycode) {
        //when we're typing a comment in the comment textfield, disable the hotkeys
        if (!(document.activeElement.nodeName == 'TEXTAREA' || document.activeElement.nodeName == 'INPUT')) {
            //get the hotkeys array
            var hotkeys = this.hotkeyservice.hotkeys; //get the hotkeys from the hotkey service
            //set the right findings index
            this.findingsindex = parseInt((_a = {},
                _a[hotkeys.finding.one] = '0',
                _a[hotkeys.finding.two] = '1',
                _a[hotkeys.finding.three] = '2',
                _a[hotkeys.finding.four] = '3',
                _a[hotkeys.finding.five] = '4',
                _a[hotkeys.finding.six] = '5',
                _a[hotkeys.finding.seven] = '6',
                _a[hotkeys.finding.eight] = '7',
                _a[hotkeys.finding.nine] = '8',
                _a
            )[keycode] || this.dataservice.getFindingsIndex().toString());
            this.dataservice.setFindingsIndex(this.findingsindex);
            //set the righ method
            this.method = (_b = {},
                _b[hotkeys.method.one] = 'T2',
                _b[hotkeys.method.two] = 'DWI',
                _b[hotkeys.method.three] = 'DCE',
                _b
            )[keycode] || this.dataservice.getMethod();
            this.dataservice.setMethod(this.method);
            //if we clicked +
            if (keycode == (hotkeys.scoring.plus + 64)) {
                this.adjustScore(-100);
            }
            else if (keycode == (hotkeys.scoring.minus + 64)) {
                this.adjustScore(100);
            }
            else if (keycode == 37) {
                this.adjustMethod('left');
            }
            else if (keycode == 39) {
                this.adjustMethod('right');
            }
            else if (keycode == 38) {
                this.adjustFinding('up');
            }
            else if (keycode == 40) {
                this.adjustFinding('down');
            }
            event.preventDefault();
        }
        var _a, _b;
    };
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
    PageController.prototype.adjustFinding = function (direction) {
        //get the findingsindex
        var findingsindex = this.dataservice.getFindingsIndex();
        //get the selected entry
        var _a = this.selectedentry, region = _a.region, level = _a.level, side = _a.side;
        if (direction == 'up') {
            //move one finding up
            if (findingsindex > 0) {
                this.dataservice.setFindingsIndex(--findingsindex);
            }
            else {
                var i = this.dataservice.findEntry(region, level, side)[1];
                findingsindex = this.dataservice.getData()[i].findings.length - 1;
                this.dataservice.setFindingsIndex(findingsindex);
            }
        }
        else if (direction == 'down') {
            var i = this.dataservice.findEntry(region, level, side)[1];
            var findingslength = this.dataservice.getData()[i].findings.length;
            //if were at the last finding, set the finding to the first one
            if (findingsindex == (findingslength - 1)) {
                this.dataservice.setFindingsIndex(0);
            }
            else {
                this.dataservice.setFindingsIndex(++findingsindex);
            }
        }
    };
    /**
     * This function gets called when we want to change the score of the selected method.
     * The delta indicates an increment or a decrement of the score.
     *
     * Delta < 0 : score ++
     *
     * Delta > 0 :  score --
     * @param delta Was originally the scroll direction of the mouse, we kept the same system. but we assign -100 or +100 when we call the function.
     */
    PageController.prototype.adjustScore = function (delta) {
        try {
            //get the selectedentry
            var _a = this.selectedentry, region = _a.region, level = _a.level, side = _a.side;
            //get the selected method
            var method = this.dataservice.getMethod();
            //find the right entry
            var _b = this.dataservice.findEntry(region, level, side), foundentry = _b[0], i = _b[1];
            //get the score array of the selected method
            var scorearray = {
                'T2': ['1', '2', '3', '4', '5', 'x'],
                'DWI': ['1', '2', '3', '4', '5', 'x'],
                'DCE': ['-', '+', 'x']
            }[method];
            //get the index
            var index = scorearray.indexOf(this.dataservice.getData()[i].findings[this.dataservice.getFindingsIndex()][method]);
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
            this.dataservice.calcPirads(region, i);
            //catch the scroll, OLD
            event.preventDefault();
        }
        //catch the scroll errors, when we scroll over a sector that's not in the data
        catch (e) {
            if (e instanceof TypeError) { } //We're scrolling over a field that's not in the data, that's okay
            else {
                console.log(e);
            }
        }
    };
    /**
     * When we press the left or right arrow keys, we change the method (T2, DWI, DCE).
     * @param direction Left or right.
     */
    PageController.prototype.adjustMethod = function (direction) {
        //the possible methods
        var methods = ['T2', 'DWI', 'DCE']; //this wil be used for the left right arrows
        //see what method were using now
        var methodindex = methods.indexOf(this.dataservice.getMethod());
        //adjust is accordingly
        methodindex = {
            'left': function () {
                if (--methodindex < 0) {
                    methodindex = methods.length - 1;
                }
                return methodindex;
            },
            'right': function () {
                if (++methodindex == methods.length) {
                    methodindex = 0;
                }
                return methodindex;
            }
        }[direction]() || methodindex;
        //and set the method to the newly 'calculated' one
        this.dataservice.setMethod(methods[methodindex]);
    };
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
    PageController.prototype.highlightEntry = function (region, level, side, fromtable) {
        //wait 1ms
        setTimeout(function () {
            //get the right row
            var element = document.getElementById(region + level + side);
            //we didn't click on the table
            if (!fromtable) {
                //scroll the selected row to the top of the page
                element.scrollIntoView();
            }
            //get the siblings
            var sibling = element.parentElement.childNodes[2];
            //stores the classname
            var classname;
            //run over all sublings
            for (; sibling; sibling = sibling.nextSibling) {
                var child = void 0;
                //get the right panel
                if ((child = sibling.childNodes[1]) && sibling != element) {
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
    };
    PageController = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [data_service_1.DataService, hotkey_service_1.HotkeyService])
    ], PageController);
    return PageController;
}());
exports.PageController = PageController;
//# sourceMappingURL=D:/Users/EYWGN/Documents/Masterproef/agility_schedar/pirads/src/app/services/page.controller.js.map