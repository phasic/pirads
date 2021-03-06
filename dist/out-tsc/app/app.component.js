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
/**
 * This is the main component. Once you open the page, this will be shown.
 *
 * By default the component has a HTML content of 'loading...', once all the elements are loaded, the component shows his content.
 *
 *      selector: 'my-app'
 *      templateUrl: './app.component.html'
 *      styleUrls: ['app.component.css']
 */
var AppComponent = (function () {
    function AppComponent() {
    }
    /**
     * This handler disables the right clicks on the page. So the user doesn't see the right click menu.
     *
     * It prevents the default action of the right mouse click.
     * @param event
     */
    AppComponent.prototype.keyPressHandler = function (event) {
        event.preventDefault();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './app.component.html',
            styleUrls: ['app.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=D:/Users/EYWGN/Documents/Masterproef/agility_schedar/pirads/src/app/app.component.js.map