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
var MapComponent = (function () {
    function MapComponent(dataservice, pagectrl, translate) {
        this.dataservice = dataservice;
        this.pagectrl = pagectrl;
        this.translate = translate;
    }
    MapComponent.prototype.keyPressHandler = function (event) {
        this.pagectrl.hotKeys(event.keyCode);
    };
    MapComponent.prototype.leftClickHandler = function (event) {
        _a = event.target.getAttribute("title").split("_"), this.region = _a[0], this.side = _a[1], this.level = _a[2];
        this.pagectrl.selectedentry = {
            region: this.region,
            level: this.level,
            side: this.side
        };
        this.addtoTable();
        var _a;
    };
    MapComponent.prototype.rightClickHandler = function (event) {
        _a = event.target.getAttribute("title").split("_"), this.region = _a[0], this.side = _a[1], this.level = _a[2];
        this.pagectrl.selectedentry = {
            region: this.region,
            level: this.level,
            side: this.side
        };
        this.addFinding();
        var _a;
    };
    MapComponent.prototype.scrollHandler = function (event) {
        this.pagectrl.adjustScore(event.deltaY);
    };
    MapComponent.prototype.addtoTable = function () {
        var _a = this.dataservice.findEntry(this.region, this.level, this.side), foundentry = _a[0], i = _a[1];
        if (!foundentry) {
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
    ;
    MapComponent.prototype.addFinding = function () {
        var confirmstring = this.translate.get("TABLE.DIALOG");
        var _a = this.dataservice.findEntry(this.region, this.level, this.side), foundentry = _a[0], i = _a[1];
        if (foundentry) {
            var length_1 = this.dataservice.getData()[i].findings.length;
            if (length_1 >= 9) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            if ((length_1 >= 4 && window.confirm(confirmstring.value)) || (length_1 < 4)) {
                this.dataservice.getData()[i].findings.push({
                    T2: 'x',
                    DWI: 'x',
                    DCE: 'x',
                    PIRADS: 'x',
                    volume: null,
                    comment: ''
                });
                this.dataservice.setFindingsIndex(this.dataservice.getData()[i].findings.length - 1);
            }
        }
        else {
            this.addtoTable();
        }
        this.pagectrl.highlightEntry(this.region, this.level, this.side);
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