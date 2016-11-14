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
var RwdImageMap = (function () {
    function RwdImageMap(elementRef) {
        var _this = this;
        this.elementRef = elementRef;
        setTimeout(function () {
            _this.imgwidth = elementRef.nativeElement.naturalWidth;
            _this.imgheight = elementRef.nativeElement.naturalHeight;
            _this.rescale();
        }, 100);
    }
    RwdImageMap.prototype.onResize = function (event) {
        this.rescale();
    };
    RwdImageMap.prototype.rescale = function () {
        var w = this.elementRef.nativeElement.width;
        var h = this.elementRef.nativeElement.height;
        var wscale = w / this.imgwidth;
        var hscale = h / this.imgheight;
        var elements = this.elementRef.nativeElement.parentNode.getElementsByTagName("area");
        for (var i = 0; i < elements.length; i++) {
            var coords = elements[i].coords.split(',');
            for (var j = 0; j < coords.length; j++) {
                if (j % 2 === 0) {
                    coords[j] = coords[j] * wscale;
                }
                else {
                    coords[j] = coords[j] * hscale;
                }
            }
            this.elementRef.nativeElement.parentNode.getElementsByTagName("area")[i].coords = coords;
        }
        this.imgwidth = w;
        this.imgheight = h;
    };
    __decorate([
        core_1.HostListener('window:resize', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Event]), 
        __metadata('design:returntype', void 0)
    ], RwdImageMap.prototype, "onResize", null);
    RwdImageMap = __decorate([
        core_1.Directive({
            selector: '[rwdimagemap]',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], RwdImageMap);
    return RwdImageMap;
}());
exports.RwdImageMap = RwdImageMap;
//# sourceMappingURL=D:/Users/EYWGN/Documents/Masterproef/agility_schedar/pirads/src/app/directives/imagemap.directive.js.map