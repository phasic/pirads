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
/**
 * This service stores all the data entered. All the findings with corresponding scores
 * the data itself will be stored in an array wit the following structure:
 *
 *       private data: {
 *             region: string;
 *             level: string;
 *             side: string;
 *             findings: {
 *                 T2: string;
 *                 DWI: string;
 *                 DCE: string;
 *                 PIRADS: string;
 *                 volume: string;
 *                 comment:string
 *             }[];
 *             index: number
 *       }[];
 *
 *
 * The DataService is called when we need to find, add, set or get data.
 *
 * Also the selected method and selected finding is stored here.
 *
 * Calculating the PIRADS score happens here.
 */
var DataService = (function () {
    /**
     * The constructor initializes the data as an empty array.
     *
     * If we want to make a framework to load data from another patient, or from an earlier consultation,
     * here is the place to do it.
     */
    function DataService() {
        this.findingsindex = 0;
        this.setData([]);
    }
    /**
     * Setter to set the complete data array.
     * @param data
     */
    DataService.prototype.setData = function (data) {
        this.data = data;
    };
    /**
     * Getter to get the complete data array.
     * @returns {{region: string, level: string, side: string, findings: {T2: string, DWI: string, DCE: string, PIRADS: string, volume: string, comment: string}[], index: number}[]}
     */
    DataService.prototype.getData = function () {
        return this.data;
    };
    /**
     * Get the findings of a certain entry.
     * @param index Index of the entry.
     * @returns {{T2: String, DWI: String, DCE: String, PIRADS: String, volume: String, comment: String}[]}
     */
    DataService.prototype.getFindings = function (index) {
        return this.data[index].findings;
    };
    /**
     * Set the selected method.
     * @param method T2, DWI, DCE.
     */
    DataService.prototype.setMethod = function (method) {
        this.method = method;
    };
    /**
     * Get the selected method
     * @returns {string}  Returns the selected method (T2, DWI, DCE)
     */
    DataService.prototype.getMethod = function () {
        return this.method;
    };
    /**
     * Set the selected index of the findings.
     * @param findingsindex
     */
    DataService.prototype.setFindingsIndex = function (findingsindex) {
        this.findingsindex = findingsindex;
    };
    /**
     * Get the selected findings index.
     * @returns {number}
     */
    DataService.prototype.getFindingsIndex = function () {
        return this.findingsindex;
    };
    /**
     * Get the finding based on the entry index and finding index.
     * @param idata Entry index.
     * @param ifindings Finding index.
     * @returns {{T2: String, DWI: String, DCE: String, PIRADS: String, volume: String, comment: String}}
     */
    DataService.prototype.getFinding = function (idata, ifindings) {
        return this.data[idata].findings[ifindings];
    };
    /**
     * Find a table entry based on a region, level and side.
     * @param region The region of the entry we want to find.
     * @param level The level of the entry we want to find.
     * @param side The side of the entry we want the find.
     * @returns {any} Return a boolean (true: found an entry in the table, false: no such entry in the table). Number: the index number of the found entry. If there isn't a found entry, the index will be pointed at the last element.
     */
    DataService.prototype.findEntry = function (region, level, side) {
        var i;
        var entry;
        //run over the data
        for (i = 0; i < this.getData().length; i++) {
            //get the entry
            entry = this.getData()[i];
            //if the entry matches the wanted region, level and side
            if ((region == entry.region) && (side == entry.side) && (level == entry.level)) {
                //return true and the index of the found entry
                return [true, i];
            }
        }
        //else return false and the last element in the data array
        return [false, i];
    };
    /**
     * Set the score of a certain entry.
     * @param region  Region of the entry.
     * @param level Level of the entry.
     * @param side Side of the entry.
     * @param index The findings index of the entry.
     * @param method The method of which we want to give a score to.
     * @param score The score.
     */
    DataService.prototype.setScore = function (region, level, side, index, method, score) {
        //look for the entry
        var _a = this.findEntry(region, level, side), foundentry = _a[0], i = _a[1];
        //set the score of that entry
        this.data[i].findings[index][method] = score;
        //recalculate the pirads score
        this.calcPirads(region, i);
    };
    /**
     * Calculate the pirads score for a certain finding. Based on a region and the entry index
     *
     * This calculation is done based on the PIRADS standard: https://www.acr.org/~/media/ACR/Documents/PDF/QualitySafety/Resources/PIRADS/PIRADS%20V2.pdf
     * @param region  The region of the sector
     * @param index The entry index
     */
    DataService.prototype.calcPirads = function (region, index) {
        //get the finding
        var finding = this.getFinding(index, this.findingsindex);
        //get the scores of that finding
        var T2 = finding.T2, DWI = finding.DWI, DCE = finding.DCE;
        //true if were in the transition zone
        var isTransition = !'t'.localeCompare(region.charAt(0).toLowerCase());
        //were in the transition zone
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