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
 * This pipe is used to make the table sortable by region, level or side.
 *
 *      @Pipe({name: 'orderBy', pure: false})
 *
 * Name: orderBy
 *
 * Impure pipe: gets called every component change
 *
 * Usage:
 *
 *      *ngFor="let entry of data | orderBy: column"
 *
 * sort the data by column, use '-' to reverse the sorting
 */
var OrderBy = (function () {
    function OrderBy() {
        /**
         * Holds a copy of the input's reference. This is used in the transform function
         * @type {Array}
         */
        this.value = [];
    }
    /**
     * Comparator that compares 2 input variables, a and b, and returns a number depending on the comparison.
     *
     * This works for both numbers and strings.
     *
     * 0: ( a = b )
     *
     * 1: ( a > b )
     *
     * -1: ( a < b )
     * @param a Input element a, can be of any type.
     * @param b Input element b, can be of any type.
     * @returns {number}  return 0,1 or -1 depending on the comparison
     * @private Private function.
     */
    OrderBy._orderByComparator = function (a, b) {
        //if a isn't passed, then a = 0
        if (a === null || typeof a === 'undefined')
            a = 0;
        //if b isn't passed, then b = 0
        if (b === null || typeof b === 'undefined')
            b = 0;
        //if a or b aren't numbers
        if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
            //Isn't a number so lowercase the string to properly compare
            //a < b
            if (a.toLowerCase() < b.toLowerCase())
                return -1;
            //a > b
            if (a.toLowerCase() > b.toLowerCase())
                return 1;
        }
        else {
            //Parse strings as numbers to compare properly
            //a < b
            if (parseFloat(a) < parseFloat(b))
                return -1;
            //a > b
            if (parseFloat(a) > parseFloat(b))
                return 1;
        }
        //if they're equal
        return 0; //equal each other
    };
    /**
     * Transform is an implementation of pipeTransform.
     *
     * Transform takes an array of inputs, sorts them based on the config ( + or - ), and returns a sorted array.
     * If we only have one element in the input, no need to sort, just return the element.
     * @param input Input values.
     * @param config  Arg that states if we want to sort ascending or descending.
     * @returns {string[]}  Returns an array with the sorted elements
     */
    OrderBy.prototype.transform = function (input, config) {
        if (config === void 0) { config = '+'; }
        //make a copy of the input's reference
        this.value = input.slice();
        var value = this.value;
        //if we only have one element in the input array, return that element
        if (!Array.isArray(value))
            return value;
        //if the config is not an array, or it is an array and we have only 1 element
        if (!Array.isArray(config) || (Array.isArray(config) && config.length == 1)) {
            //check if we want to sort asc or desc
            var propertyToCheck = !Array.isArray(config) ? config : config[0];
            //set desc to true if congig = '-'
            var desc = propertyToCheck.substr(0, 1) == '-';
            //Basic array
            if (!propertyToCheck || propertyToCheck == '-' || propertyToCheck == '+') {
                //sort it
                return !desc ? value.sort() : value.sort().reverse();
            }
            else {
                var property = propertyToCheck.substr(0, 1) == '+' || propertyToCheck.substr(0, 1) == '-'
                    ? propertyToCheck.substr(1)
                    : propertyToCheck;
                return value.sort(function (a, b) {
                    return !desc
                        ? OrderBy._orderByComparator(a[property], b[property])
                        : -OrderBy._orderByComparator(a[property], b[property]);
                });
            }
        }
        else {
            //Loop over property of the array in order and sort
            return value.sort(function (a, b) {
                for (var i = 0; i < config.length; i++) {
                    var desc = config[i].substr(0, 1) == '-';
                    var property = config[i].substr(0, 1) == '+' || config[i].substr(0, 1) == '-'
                        ? config[i].substr(1)
                        : config[i];
                    var comparison = !desc
                        ? OrderBy._orderByComparator(a[property], b[property])
                        : -OrderBy._orderByComparator(a[property], b[property]);
                    //Don't return 0 yet in case of needing to sort by next property
                    if (comparison != 0)
                        return comparison;
                }
                return 0; //equal each other
            });
        }
    };
    OrderBy = __decorate([
        core_1.Pipe({ name: 'orderBy', pure: false }), 
        __metadata('design:paramtypes', [])
    ], OrderBy);
    return OrderBy;
}());
exports.OrderBy = OrderBy;
//# sourceMappingURL=D:/Users/EYWGN/Documents/Masterproef/agility_schedar/pirads/src/app/components/table/orderby.js.map