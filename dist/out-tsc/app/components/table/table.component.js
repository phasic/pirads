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
var TableComponent = (function () {
    function TableComponent(dataservice, pagectrl, translate) {
        var _this = this;
        this.dataservice = dataservice;
        this.pagectrl = pagectrl;
        this.translate = translate;
        this.zones = ['region', 'level', 'side'];
        this.columns = ['T2', 'DWI', 'DCE', 'PIRADS'];
        this.scorearray = {
            'T2': ['1', '2', '3', '4', '5', 'x'],
            'DWI': ['1', '2', '3', '4', '5', 'x'],
            'DCE': ['-', '+', 'x']
        };
        this.sort = {
            column: '',
            descending: false
        };
        this.data = dataservice.getData();
        setTimeout(function () {
            _this.sorttitle = translate.get("TABLE.SORT BY");
            _this.sort = {
                column: _this.sorttitle.value,
                descending: false
            };
        });
    }
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
    //we don't use this anymore, because the colors are too bright
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
    TableComponent.prototype.setVolume = function (volume, ientry, ifinding) {
        this.dataservice.getFindings(ientry)[ifinding].volume = volume;
    };
    TableComponent.prototype.setComment = function (comment, ientry, ifinding) {
        this.dataservice.getFindings(ientry)[ifinding].comment = comment;
    };
    TableComponent.prototype.removeRow = function (index) {
        this.dataservice.getData().splice(index, 1);
    };
    TableComponent.prototype.clickSort = function (columnName) {
        this.sort = (this.sort.column == columnName) ? { column: columnName, descending: !this.sort.descending } : { column: columnName, descending: false };
        this.sorttitle = this.translate.get("TABLE." + columnName.toLocaleUpperCase());
    };
    TableComponent.prototype.convertSorting = function () {
        return this.sort.descending ? '-' + this.sort.column : this.sort.column;
    };
    TableComponent.prototype.tableClickHandler = function (region, level, side) {
        this.pagectrl.selectedentry = { region: region, level: level, side: side };
        // this.dataservice.setMethod('T2');
        // this.dataservice.setFindingsIndex(0);
        this.pagectrl.highlightEntry(region, level, side, true);
    };
    TableComponent.prototype.tableRightClickHandler = function (region, level, side) {
        var confirmstring = this.translate.get("TABLE.DIALOG");
        var _a = this.dataservice.findEntry(region, level, side), foundentry = _a[0], i = _a[1];
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
        this.pagectrl.highlightEntry(region, level, side);
        event.preventDefault();
        event.stopPropagation();
    };
    TableComponent.prototype.setScore = function (method, score, ifinding) {
        var _a = this.pagectrl.selectedentry, region = _a.region, level = _a.level, side = _a.side;
        this.dataservice.setScore(region, level, side, ifinding, method, score);
        var idata = this.dataservice.findEntry(region, level, side)[1];
        this.dataservice.setFindingsIndex(ifinding);
        this.dataservice.setMethod(method);
        this.dataservice.calcPirads(region, idata);
        event.stopPropagation();
    };
    TableComponent.prototype.checkIfSelectedEntry = function (region, level, side) {
        return (this.pagectrl.selectedentry.region == region) &&
            (this.pagectrl.selectedentry.level == level) &&
            (this.pagectrl.selectedentry.side == side);
    };
    TableComponent.prototype.test = function () {
        console.log(this.dataservice.getMethod());
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