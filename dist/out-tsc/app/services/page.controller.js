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
var PageController = (function () {
    function PageController(dataservice, hotkeyservice) {
        this.dataservice = dataservice;
        this.hotkeyservice = hotkeyservice;
        this.method = '';
    }
    Object.defineProperty(PageController.prototype, "selectedentry", {
        get: function () {
            return this._selectedentry;
        },
        set: function (value) {
            this._selectedentry = value;
        },
        enumerable: true,
        configurable: true
    });
    PageController.prototype.hotKeys = function (keycode) {
        var hotkeys = this.hotkeyservice.hotkeys; //get the hotkeys from the hotkey service
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
        this.method = (_b = {},
            _b[hotkeys.method.one] = 'T2',
            _b[hotkeys.method.two] = 'DWI',
            _b[hotkeys.method.three] = 'DCE',
            _b
        )[keycode] || this.dataservice.getMethod();
        this.dataservice.setMethod(this.method);
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
        var _a, _b;
    };
    PageController.prototype.adjustFinding = function (direction) {
        var findingsindex = this.dataservice.getFindingsIndex();
        var _a = this.selectedentry, region = _a.region, level = _a.level, side = _a.side;
        if (direction == 'up') {
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
            if (findingsindex == (findingslength - 1)) {
                this.dataservice.setFindingsIndex(0);
            }
            else {
                this.dataservice.setFindingsIndex(++findingsindex);
            }
        }
    };
    PageController.prototype.adjustScore = function (delta) {
        try {
            var x = void 0;
            var _a = this.selectedentry, region = _a.region, level = _a.level, side = _a.side;
            var method = this.dataservice.getMethod();
            var _b = this.dataservice.findEntry(region, level, side), foundentry = _b[0], i = _b[1];
            var scorearray = {
                'T2': ['1', '2', '3', '4', '5', 'x'],
                'DWI': ['1', '2', '3', '4', '5', 'x'],
                'DCE': ['-', '+', 'x']
            }[method];
            var index = scorearray.indexOf(this.dataservice.getData()[i].findings[this.dataservice.getFindingsIndex()][method]);
            if (delta > 0 && index-- <= 0) {
                index = scorearray.length - 1;
            }
            else if (delta < 0 && ++index == scorearray.length) {
                index = 0;
            }
            this.dataservice.getData()[i].findings[this.dataservice.getFindingsIndex()][method] = scorearray[index];
            this.dataservice.calcPirads(region, i);
            event.preventDefault();
            event.stopPropagation();
        }
        catch (e) {
            if (e instanceof TypeError) { } //We're scrolling over a field that's not in the data, that's okay
            else {
                console.log(e);
            }
        }
    };
    PageController.prototype.adjustMethod = function (direction) {
        var methods = ['T2', 'DWI', 'DCE']; //this wil be used for the left right arrows
        var methodindex = methods.indexOf(this.dataservice.getMethod());
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
        this.dataservice.setMethod(methods[methodindex]);
    };
    PageController.prototype.highlightEntry = function (region, level, side, fromtable) {
        setTimeout(function () {
            var element = document.getElementById(region + level + side);
            if (!fromtable) {
                element.scrollIntoView();
            }
            var sibling = element.parentElement.childNodes[2];
            var classname;
            for (; sibling; sibling = sibling.nextSibling) {
                var child = void 0;
                if ((child = sibling.childNodes[1]) && sibling != element) {
                    classname = child.className.replace("panel-primary", "panel-info");
                    child.setAttribute('class', classname);
                }
            }
            classname = element.childNodes[1].className.replace("panel-info", "panel-primary");
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