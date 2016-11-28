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
var http_1 = require('@angular/http');
/**
 * The HotkeyService reads the hotkeys.json file, and parses it into an array that can be used in the code to assign keybindings to functionality.
 *
 * When you want to change hotkeys, change the file and reload the page.
 *
 * Structure of the hotkeys array:
 *
 *       private _hotkeys: {
 *                  method: {
 *                    one: number,
 *                    two: number,
 *                    three: number
 *                  },
 *                  finding: {
 *                    one: number,
 *                    two: number,
 *                    three: number,
 *                    four: number,
 *                    five: number,
 *                    six: number,
 *                    seven: number,
 *                    eight: number,
 *                    nine: number
 *                  },
 *                  scoring: {
 *                    plus: number,
 *                    minus: number
 *                  }
 *     };
 *
 * The hotkeys array contains the keycodes of the hotkeys.
 *
 * Rebinding + and - won't work at the moment, the keycodes are calculated differently. Possible solution: store the characters in the array, and handle the keycodes in the rest of the code.
 */
var HotkeyService = (function () {
    /**
     * http service gets the hotkeys.json file and maps it to a response. That response will get assigned to the hotkeys array.
     * The hotkeys array contains the keycodes of the hotkeys.
     * @param http used to read the json file
     */
    function HotkeyService(http) {
        var _this = this;
        this.http = http;
        http.get('assets/hotkeys.json') //send a get request to the hotkeys.json file
            .map(function (res) { return res.json(); }) //get the response, parse it to jason
            .subscribe(function (res) {
            _this._hotkeys = {
                method: {
                    one: res["METHOD"]["ONE"].toLocaleUpperCase().charCodeAt(0),
                    two: res["METHOD"]["TWO"].toLocaleUpperCase().charCodeAt(0),
                    three: res["METHOD"]["THREE"].toLocaleUpperCase().charCodeAt(0),
                },
                finding: {
                    one: res["FINDING"]["ONE"].charCodeAt(0),
                    two: res["FINDING"]["TWO"].charCodeAt(0),
                    three: res["FINDING"]["THREE"].charCodeAt(0),
                    four: res["FINDING"]["FOUR"].charCodeAt(0),
                    five: res["FINDING"]["FIVE"].charCodeAt(0),
                    six: res["FINDING"]["SIX"].charCodeAt(0),
                    seven: res["FINDING"]["SEVEN"].charCodeAt(0),
                    eight: res["FINDING"]["EIGHT"].charCodeAt(0),
                    nine: res["FINDING"]["NINE"].charCodeAt(0)
                },
                scoring: {
                    plus: res["SCORING"]["PLUS"].charCodeAt(0),
                    minus: res["SCORING"]["MINUS"].charCodeAt(0)
                }
            };
        });
    }
    Object.defineProperty(HotkeyService.prototype, "hotkeys", {
        /**
         * Getter that returns the hotkey array.
         * @returns {{method: {one: number, two: number, three: number}, finding: {one: number, two: number, three: number, four: number, five: number, six: number, seven: number, eight: number, nine: number}, scoring: {plus: number, minus: number}}}
         */
        get: function () {
            return this._hotkeys;
        },
        enumerable: true,
        configurable: true
    });
    HotkeyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HotkeyService);
    return HotkeyService;
}());
exports.HotkeyService = HotkeyService;
//# sourceMappingURL=D:/Users/EYWGN/Documents/Masterproef/agility_schedar/pirads/src/app/services/hotkey.service.js.map