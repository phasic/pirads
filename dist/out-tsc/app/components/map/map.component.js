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
 * This component contains the clickable PIRADS sector map, and all the related functionality.
 *
 * When you left click on a sector, we first check if there's already an entry in the table with that name. If not, then add it to the table.
 * If there is an entry, highlight that entry in the table.
 *
 * If you right click on a sector, we first check if there's already an entry with that name, if there is: highlight that entry, and add an extra finding to the table.
 * If we don't find an entry with that name, add a new entry to the table with that name.
 *
 *      selector: 'map-component'
 *
 *      templateUrl: '../../templates/map/map.template.html'
 *
 */
var MapComponent = (function () {
    /**
     * The constructor will initialize the following
     * @param dataservice This service contains all the data. This is used to set and get the correct data we want.
     * @param pagectrl  This service contains all the shared functionality. This service mainly handles the hotkeys and adjusting scores/methods/finding (used for navigation through the table)
     * @param translate This variable contains the TranslateService, and will be used to translate the placeholder values to the right language.
     */
    function MapComponent(dataservice, pagectrl, translate) {
        this.dataservice = dataservice;
        this.pagectrl = pagectrl;
        this.translate = translate;
    }
    /**
     * keyPressHandler hangs on the window of the application, and listens to keypresses.
     * If there is a keyboard key pressed, he will call the hotKeys function in the pagecontroller to handle the keypress.
     * @param event The keydown event.
     */
    MapComponent.prototype.keyPressHandler = function (event) {
        //Call the hotkeys function of the pagecontroller when a key is pressed on the keyboard
        this.pagectrl.hotKeys(event.keyCode);
    };
    /**
     * when a sector on the sector map is left clicked, this function handles that event.
     *
     * After the left click, we get the title of the clicked sector. We split the title up, and set region, level, side.
     * Then we set the selected entry in the pagecontroller to the clicked sector map. This is needed to adjust the score of the correct entry.
     * After this, we attempt to add this sector to the table, we call addtoTable().
     *
     * @param event The click event.
     */
    MapComponent.prototype.leftClickHandler = function (event) {
        //split the title and bind the values to region, side, level
        _a = event.target.getAttribute("title").split("_"), this.region = _a[0], this.side = _a[1], this.level = _a[2];
        //set the selected entry in the pagecontroller to this sector
        this.pagectrl.selectedentry = {
            region: this.region,
            level: this.level,
            side: this.side
        };
        //attempt to add this sector to the table
        this.addtoTable();
        var _a;
    };
    /**
     * When a sector on the sector map is right clicked, this function handles that event.
     *
     * After the right click, we get the title of the clicked sector. We split the title up, and set the region, level, side.
     * Then we set the selected entry in the pagecontroller to the clicked sector map. This is needed to adjust the score of the correct entry.
     * After this, we attempt to add a finding for this sector, we call addFinding().
     *
     * @param event The contextmenu event.
     */
    MapComponent.prototype.rightClickHandler = function (event) {
        //split the title and vind the values to region, side, level
        _a = event.target.getAttribute("title").split("_"), this.region = _a[0], this.side = _a[1], this.level = _a[2];
        //set the selected entry in the pagecontroller to this sector
        this.pagectrl.selectedentry = {
            region: this.region,
            level: this.level,
            side: this.side
        };
        //attempt to add a finding for this sector
        this.addFinding();
        var _a;
    };
    /**
     *
     * NOT USED ANYMORE: unwanted page scrolling when we have a large table. Adjusting score is now done with the keyboard.
     *
     *
     * When a sector is hovered over and we scroll with the scrollwheel, this function handles that event.
     *
     * When we scroll, we can quickly adapt the score of a sector we're hovering over.
     * @param event The mousewheel event.
     */
    MapComponent.prototype.scrollHandler = function (event) {
        //use the scroll direction of the event to adjust the score in the pagecontroller
        this.pagectrl.adjustScore(event.deltaY);
    };
    /**
     * When we attempt to add a new entry to the table we call addtoTable.
     *
     * This function will check if the region, level and side already exist in the table.
     * If they don't, add it to the data in the dataservice (this will add it to the table dynamically)
     * The findings of the entry are all default on 'x'
     * The selected method in the pagecontroller will be set on 'T2'
     *
     * If we found an entry, we just set the findings index on 0 and highlight that entry in the table.
     *
     * A sector can have multiple findings, that's why we set the findings index on 0, so we are at the top of that entry.
     */
    MapComponent.prototype.addtoTable = function () {
        //check if an entry already exists with this region, level and side
        var _a = this.dataservice.findEntry(this.region, this.level, this.side), foundentry = _a[0], i = _a[1];
        //if it doesn't
        if (!foundentry) {
            //add it to the data
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
                //also keep an index where in the data it is
                index: i
            });
            //set the selected method to T2
            this.dataservice.setMethod('T2');
        }
        //set the findings index to 0, this is also the case if we found an entry with this name
        this.dataservice.setFindingsIndex(0);
        //highlight the entry in the table
        this.pagectrl.highlightEntry(this.region, this.level, this.side);
    };
    ;
    /**
     * After we right clicked on a sector, we will attempt to add a finding to the table.
     *
     * First we will see if the entry with the region, level and side already exists.
     * If it does, see how many entries we already got for that sector. If it's more that 9, don't do anything.
     * If it's more than 4, but less than 9, ask for confirmation. When it's less than 4, add an extra finding to the table.
     *
     * If we don't find an entry of that sector, add the sector to the table by calling addtoTable().
     */
    MapComponent.prototype.addFinding = function () {
        //this is the string you'll see when you try to add more than 4 findings to the table
        var confirmstring = this.translate.get("TABLE.DIALOG");
        //check if an entry already exists with this region, level and side
        var _a = this.dataservice.findEntry(this.region, this.level, this.side), foundentry = _a[0], i = _a[1];
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
        else {
            //add the sector to the table
            this.addtoTable();
        }
        //highlight the sector in the table
        this.pagectrl.highlightEntry(this.region, this.level, this.side);
        //catch the right click
        event.preventDefault();
        event.stopPropagation();
    };
    MapComponent = __decorate([
        core_1.Component({
            selector: 'map-component',
            templateUrl: '../../templates/map/map.template.html'
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, page_controller_1.PageController, ng2_translate_1.TranslateService])
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
//# sourceMappingURL=D:/Users/EYWGN/Documents/Masterproef/agility_schedar/pirads/src/app/components/map/map.component.js.map