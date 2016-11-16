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
 * Directive used to rescale the imagemaps when the page is rescaled. So the imagemaps keep corresponding the underlying sector map image.
 *
 *      selector: '[rwdimagemap]'
 *
 */
var RwdImageMap = (function () {
    /**
     * The constructor will define the element, the image map, when initialized.
     *
     * After 100ms we will get the natural, unscaled, width of the image
     * @param elementRef
     */
    function RwdImageMap(elementRef) {
        var _this = this;
        this.elementRef = elementRef;
        //wait 100ms
        setTimeout(function () {
            //get the width and height of the imagemap, then call rescale
            _this.imgwidth = elementRef.nativeElement.naturalWidth;
            _this.imgheight = elementRef.nativeElement.naturalHeight;
            _this.rescale();
        }, 100);
    }
    /**
     * When we resize the page, this will get called.
     *
     * When we resize, we need to rescale the imagemap, because this isn't inherently responsive unlike the underlying image.
     * @param event The resize event
     */
    RwdImageMap.prototype.onResize = function (event) {
        this.rescale();
    };
    /**
     * When we rescale the page, we need to scale the imagemap with the same proportions as the underlying image.
     *
     * First we get the current width and height of the image, calculate a scale (current width / original width)
     *
     * Once we got a width and height scale, we get the area elements of the imagemap. Get the coords and split them.
     *
     *
     * The even coordinates we'll multiply by the width scale, the odd coordinates by the height scale.
     *
     * Then assign those coordinates again to the corresponding area.
     *
     * At the end set the imgwidth en imgheight to the current width and height. (calculating the scale happens iteratively every time we rescale the page,
     * it's not calculated from the native size, but from the current size en previous size)
     */
    RwdImageMap.prototype.rescale = function () {
        //get the current width
        var w = this.elementRef.nativeElement.width;
        //get the current height
        var h = this.elementRef.nativeElement.height;
        //calculate the wscale
        var wscale = w / this.imgwidth;
        //calculate thehscale
        var hscale = h / this.imgheight;
        //get hte area elements
        var elements = this.elementRef.nativeElement.parentNode.getElementsByTagName("area");
        //iterate over all the found area elements
        for (var i = 0; i < elements.length; i++) {
            //get the coordinates of an area and split them
            var coords = elements[i].coords.split(',');
            //run over all the coordinates
            for (var j = 0; j < coords.length; j++) {
                //even
                if (j % 2 === 0) {
                    //multiply it by wscale
                    coords[j] = coords[j] * wscale;
                }
                else {
                    //multiply it by hscale
                    coords[j] = coords[j] * hscale;
                }
            }
            //set the coordinates of the area to the newly calculated coordinates
            this.elementRef.nativeElement.parentNode.getElementsByTagName("area")[i].coords = coords;
        }
        //set the current width to the new width
        this.imgwidth = w;
        //set the current height to the new height
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
            selector: '[rwdimagemap]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], RwdImageMap);
    return RwdImageMap;
}());
exports.RwdImageMap = RwdImageMap;
//# sourceMappingURL=D:/Users/EYWGN/Documents/Masterproef/agility_schedar/pirads/src/app/directives/imagemap.directive.js.map