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
var DataService = (function () {
    function DataService() {
        this.findingsindex = 0;
        this.setData([]);
    }
    DataService.prototype.setData = function (data) {
        this.data = data;
    };
    DataService.prototype.getData = function () {
        return this.data;
    };
    DataService.prototype.getFindings = function (index) {
        return this.data[index].findings;
    };
    DataService.prototype.setMethod = function (method) {
        this.method = method;
    };
    DataService.prototype.getMethod = function () {
        return this.method;
    };
    DataService.prototype.setFindingsIndex = function (findingsindex) {
        this.findingsindex = findingsindex;
    };
    DataService.prototype.getFindingsIndex = function () {
        return this.findingsindex;
    };
    DataService.prototype.getFinding = function (idata, ifindings) {
        return this.data[idata].findings[ifindings];
    };
    DataService.prototype.findEntry = function (region, level, side) {
        var i;
        var entry;
        for (i = 0; i < this.getData().length; i++) {
            entry = this.getData()[i];
            if ((region == entry.region) && (side == entry.side) && (level == entry.level)) {
                return [true, i];
            }
        }
        return [false, i];
    };
    DataService.prototype.setScore = function (region, level, side, index, method, score) {
        var _a = this.findEntry(region, level, side), foundentry = _a[0], i = _a[1];
        this.data[i].findings[index][method] = score;
        this.calcPirads(region, i);
    };
    DataService.prototype.calcPirads = function (region, index) {
        var finding = this.getFinding(index, this.findingsindex);
        var T2 = finding.T2, DWI = finding.DWI, DCE = finding.DCE;
        var isTransition = !'t'.localeCompare(region.charAt(0).toLowerCase());
        if (isTransition) {
            if (T2 !== '3') {
                finding.PIRADS = T2;
            }
            else {
                if (DWI === 'x') {
                    if (DCE === '-') {
                        finding.PIRADS = '3';
                    }
                    else {
                        finding.PIRADS = '4';
                    }
                }
                else {
                    if (parseInt(DWI) <= 4) {
                        finding.PIRADS = '3';
                    }
                    else {
                        finding.PIRADS = '4';
                    }
                }
            }
        }
        else {
            if (DWI === 'x') {
                if (T2 === '3') {
                    if (DCE === '-') {
                        finding.PIRADS = '3';
                    }
                    else {
                        finding.PIRADS = '4';
                    }
                }
                else {
                    finding.PIRADS = T2;
                }
            }
            else if (DWI === '3') {
                finding.PIRADS = {
                    'x': DWI,
                    '-': '3',
                    '+': '4'
                }[DCE];
            }
            else {
                finding.PIRADS = DWI;
            }
        }
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=D:/Users/EYWGN/Documents/Masterproef/agility_schedar/pirads/src/app/services/data.service.js.map