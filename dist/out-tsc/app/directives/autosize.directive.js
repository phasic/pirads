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
 * Directive used to make an autosizing text box. When you type in the comment area,
 * the area will automatically grow vertically. This is to prevent scrolling.
 *
 *          selector: '[autosize]'
 *
 */
var Autosize = (function () {
    /**
     * The constructor will define the textarea element.
     * @param element
     */
    function Autosize(element) {
        this.element = element;
    }
    /**
     * This function gets called when we are typing in the textarea, every time a letter is typed we call this.adjust().
     * @param textArea The textarea where we are typing in
     */
    Autosize.prototype.onInput = function (textArea) {
        this.adjust();
    };
    /**
     * When this directive is initialized (when a textarea is created, call this.adjust()).
     */
    Autosize.prototype.ngOnInit = function () {
        this.adjust();
    };
    /**
     * Sets the overflow and height of the textarea. The height is depending on the scrollheight.
     */
    Autosize.prototype.adjust = function () {
        this.element.nativeElement.style.overflow = 'hidden';
        this.element.nativeElement.style.height = 'auto';
        this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + "px";
    };
    __decorate([
        core_1.HostListener('input', ['$event.target']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [HTMLTextAreaElement]), 
        __metadata('design:returntype', void 0)
    ], Autosize.prototype, "onInput", null);
    Autosize = __decorate([
        core_1.Directive({
            selector: '[autosize]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Autosize);
    return Autosize;
}());
exports.Autosize = Autosize;
//# sourceMappingURL=D:/Users/EYWGN/Documents/Masterproef/agility_schedar/pirads/src/app/directives/autosize.directive.js.map