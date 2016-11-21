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
/**
 * This component contains the clickable PIRADS sector map, and all the related functionality.
 *
 * When you left click on a sector, we first check if there's already an entry in the table with that name. If not, then add it to the table.
 * If there is an entry, highlight that entry in the table.
 *
 * If you right click on a sector, we first check if there's already an entry with that name, if there is: highlight that entry, and add an extra finding to the table.
 * If we don't find an entry with that name, add a new entry to the table with that name.
 *
 *      selector: 'map-component'
 *
 *      templateUrl: '../../templates/map/map.template.html'
 *
 */
var MapComponent = (function () {
    /**
     * The constructor will initialize the following
     * @param dataservice This service contains all the data. This is used to set and get the correct data we want.
     * @param pagectrl  This service contains all the shared functionality. This service mainly handles the hotkeys and adjusting scores/methods/finding (used for navigation through the table)
     * @param translate This variable contains the TranslateService, and will be used to translate the placeholder values to the right language.
     */
    function MapComponent(dataservice, pagectrl, translate) {
        this.dataservice = dataservice;
        this.pagectrl = pagectrl;
        this.translate = translate;
        /**
         * This array contains all the definitions of the areas of the sector map.
         *
         * Evert area is defined by a title and its corresponding coordinates.
         * @type {{title: string; coords: string}[]}
         */
        this.areas = [{
                "title": "AS_R_base",
                "coords": "312,166,318,163,323,166,327,173,328,180,330,175,332,168,335,162,338,158,341,154,344,150,348,147,352,144,357,142,362,140,370,139,376,139,382,141,389,145,393,149,396,154,399,159,401,163,402,159,402,154,402,149,402,143,403,138,403,134,404,129,404,126,401,126,396,126,394,126,389,126,383,127,378,127,372,128,366,130,362,131,356,132,351,134,347,136,342,139,338,141,334,143,330,146,326,149,321,153,317,158"
            }, {
                "title": "AS_L_base",
                "coords": "406,126,408,130,408,134,409,139,409,145,409,150,409,154,409,159,409,164,412,160,414,155,418,151,421,147,424,144,429,142,433,140,438,139,444,139,449,140,453,141,457,142,459,144,463,146,466,149,469,151,471,154,474,157,477,161,479,165,481,170,481,176,482,182,483,178,485,172,487,168,490,165,493,162,496,163,500,166,498,162,495,157,491,153,487,149,484,146,481,144,478,142,474,140,471,138,466,136,463,134,458,133,453,131,447,130,441,129,434,127,427,126,420,126,412,126"
            }, {
                "title": "TZa_R_base",
                "coords": "332,192,330,187,329,183,329,179,330,174,331,169,333,165,335,160,338,156,341,153,344,151,347,148,350,145,354,143,358,142,362,140,365,139,369,139,373,139,378,140,382,142,385,144,389,146,391,148,393,150,395,154,397,157,398,160,400,162,401,164,401,166,402,169,402,172,402,175,402,178,402,180,403,183,403,186,404,189,404,191,405,193,403,193,400,194,334,193"
            }, {
                "title": "TZa_L_base",
                "coords": "406,193,408,189,409,184,409,178,410,173,410,168,410,164,411,161,413,158,414,156,416,153,419,150,421,147,424,144,427,142,431,141,435,140,439,140,443,140,447,140,452,141,455,143,460,145,462,147,464,148,467,150,469,152,471,154,474,158,478,163,480,169,481,175,482,180,481,186,480,190,479,192,477,194,410,194"
            }, {
                "title": "TZp_R_base",
                "coords": "332,195,406,194,406,214,361,215,351,213,344,210,338,205"
            }, {
                "title": "TZp_L_base",
                "coords": "479,193,405,194,406,212,453,213,462,212,469,206,474,202"
            }, {
                "title": "CZ_R_base",
                "coords": "333,195,334,197,336,200,338,202,339,205,341,207,344,209,347,210,350,212,353,213,356,214,360,214,364,214,369,214,373,214,378,214,383,213,388,213,392,213,395,213,399,213,403,213,406,213,405,264,399,264,394,264,390,264,387,264,382,264,378,263,375,262,371,261,368,259,365,258,362,256,359,254,356,251,353,248,350,244,347,240,345,236,342,231,340,226,338,220,337,216"
            }, {
                "title": "CZ_L_base",
                "coords": "405,213,405,264,420,264,434,263,439,261,449,255,454,251,461,244,465,238,469,231,472,224,474,216,476,207,477,200,479,194,471,203,468,207,461,210,453,213,447,214,437,214"
            }, {
                "title": "PZpl_R_base",
                "coords": "299,203,331,195,333,200,334,205,334,210,336,214,337,218,338,223,340,228,342,231,344,235,346,239,348,242,351,245,354,249,357,253,360,256,364,258,367,260,370,262,374,264,368,264,364,263,361,263,358,262,355,262,351,262,348,261,345,261,342,260,339,260,336,259,332,258,329,257,326,255,323,254,320,253,316,250,313,248,310,246,307,243,304,240,302,236,301,232,299,228,298,224,297,220,297,215,298,210"
            }, {
                "title": "PZpl_L_base",
                "coords": "512,205,480,193,477,208,475,212,473,218,471,226,468,231,465,239,460,244,455,250,450,255,444,259,438,262,445,262,451,261,458,260,469,257,475,255,482,252,488,250,494,246,499,242,502,237,505,233,508,228,510,223,512,217,512,211"
            }, {
                "title": "PZa_R_base",
                "coords": "298,202,299,199,300,194,302,189,303,185,304,181,306,177,307,173,309,170,311,167,314,165,317,163,320,163,322,165,324,167,325,170,326,173,327,176,328,179,329,183,330,186,331,189,331,192,332,194"
            }, {
                "title": "PZa_L_base",
                "coords": "479,194,481,189,481,184,483,180,485,175,486,172,487,168,490,164,493,162,496,163,499,165,501,167,502,170,504,173,505,177,507,180,508,184,509,187,510,192,511,196,511,199,512,203,512,206"
            }, {
                "title": "AS_R_mid",
                "coords": "405,314,401,314,396,314,391,315,387,317,383,317,378,319,374,320,370,322,366,324,362,325,358,328,356,329,353,332,356,331,358,332,359,335,359,337,359,340,361,339,364,336,368,334,371,333,375,332,378,331,381,331,385,331,388,332,391,333,393,335,395,336,397,339,399,342,401,345,401,348,402,351,403,354,404,356,404,359,404,363,404,366,404,368,403,371,405,371"
            }, {
                "title": "AS_L_mid",
                "coords": "455,330,453,331,451,332,451,335,452,338,450,338,446,335,443,334,440,333,436,332,433,331,430,332,426,332,423,333,421,335,418,337,416,340,414,342,412,346,411,349,410,353,409,356,408,360,408,364,408,368,408,371,408,373,406,371,406,369,405,363,405,349,405,336,405,314,410,314,415,314,419,315,423,316,428,317,434,319,439,321,444,323,448,325"
            }, {
                "title": "TZa_R_mid",
                "coords": "402,376,340,376,341,373,341,369,342,365,343,361,345,358,347,354,349,351,351,348,354,345,357,343,360,340,363,337,368,335,372,332,376,332,379,331,383,331,387,332,390,332,394,334,396,337,398,340,400,344,402,348,403,354,404,359,404,363,404,369,403,372"
            }, {
                "title": "TZa_L_mid",
                "coords": "471,376,409,376,409,372,408,368,408,364,408,361,409,356,410,353,411,349,413,345,415,341,418,338,421,336,425,334,430,332,435,332,440,333,445,334,449,337,454,341,458,344,460,347,464,352,467,357,469,362,471,368"
            }, {
                "title": "TZp_R_mid",
                "coords": "403,375,341,375,341,381,342,384,342,388,343,390,345,395,347,398,349,402,352,405,356,407,361,410,367,411,372,411,378,410,384,407,388,404,392,400,395,396,398,392,400,387,401,383"
            }, {
                "title": "TZp_L_mid",
                "coords": "471,375,409,376,410,379,411,383,412,385,413,390,415,393,417,396,420,400,423,403,427,407,432,409,436,411,440,411,445,411,450,410,454,409,457,406,461,403,465,399,467,395,469,390,470,384"
            }, {
                "title": "PZpm_R_mid",
                "coords": "353,445,342,392,344,395,346,398,348,401,349,403,352,406,356,408,360,410,365,411,370,412,375,410,381,409,385,406,387,404,389,402,391,401,390,404,389,406,391,407,393,405,395,403,397,401,400,399,403,397,405,396,405,450,403,451,396,452,392,452,386,451,382,451,375,450,371,449,365,448,359,447"
            }, {
                "title": "PZpm_L_mid",
                "coords": "466,399,463,403,459,406,453,409,446,412,441,412,437,411,432,409,428,407,425,405,423,403,421,404,421,406,419,405,417,403,414,401,412,400,409,398,407,396,405,395,405,451,408,451,413,451,417,451,422,451,427,450,433,450,438,448,442,448,447,447,452,446,456,444"
            }, {
                "title": "PZpl_R_mid",
                "coords": "352,445,348,444,344,442,340,440,337,438,334,435,331,433,328,431,326,428,324,426,323,422,321,419,319,414,318,411,317,407,316,403,316,398,316,394,316,391,316,388,339,377"
            }, {
                "title": "PZpl_L_mid",
                "coords": "456,445,458,444,462,443,466,441,470,439,473,436,477,434,479,431,483,428,485,425,487,422,489,418,491,414,492,410,493,406,494,403,495,398,495,395,494,391,494,388,471,377"
            }, {
                "title": "PZa_R_mid",
                "coords": "359,340,355,344,352,346,351,348,349,351,347,353,345,357,343,361,342,365,341,369,341,372,341,375,316,388,316,385,316,381,317,377,319,372,321,367,324,362,327,358,328,355,331,351,334,348,337,345,340,342,342,339,345,337,347,336,350,333,352,332,356,331,358,332,359,334,360,337"
            }, {
                "title": "PZa_L_mid",
                "coords": "453,340,455,342,457,344,460,346,461,349,463,351,465,354,467,358,468,361,470,366,471,370,471,374,472,376,494,387,494,384,494,380,493,376,492,372,490,368,488,364,485,360,483,356,479,351,476,347,473,344,470,341,466,338,463,335,460,333,457,331,455,331,452,332,451,336"
            }, {
                "title": "AS_R_apex",
                "coords": "405,508,402,507,398,507,396,508,391,509,388,509,384,510,380,511,376,512,374,513,370,515,366,516,368,517,371,518,374,518,377,520,379,524,379,528,378,531,383,528,386,526,390,524,394,524,397,525,400,527,402,529,403,532,404,535,405,539,405,542,405,547,404,550,403,552,405,552"
            }, {
                "title": "AS_L_apex",
                "coords": "405,509,408,508,411,509,415,509,419,510,422,510,427,511,430,512,434,514,438,515,441,516,443,517,440,518,437,519,435,520,433,522,433,525,433,527,434,530,434,532,431,529,428,528,426,526,422,525,419,525,416,527,414,528,412,531,410,533,409,536,408,539,408,542,408,546,408,549,408,554,406,554"
            }, {
                "title": "TZa_R_apex",
                "coords": "370,553,370,549,371,544,373,540,375,536,377,534,379,531,382,529,385,526,389,524,393,524,397,524,400,526,402,529,403,532,404,536,404,539,405,543,405,548,404,550,404,552"
            }, {
                "title": "TZa_L_apex",
                "coords": "408,554,408,551,408,547,408,544,409,541,410,537,411,534,413,531,414,528,417,526,420,525,424,525,426,526,430,528,432,530,434,532,436,534,438,536,440,539,441,542,442,546,442,549,442,552,441,555"
            }, {
                "title": "TZp_R_apex",
                "coords": "404,554,403,556,401,559,401,562,399,565,397,567,395,569,392,570,389,572,385,572,381,571,379,570,376,569,374,566,372,563,371,560,370,557,371,554"
            }, {
                "title": "TZp_L_apex",
                "coords": "408,554,409,557,410,560,411,563,413,565,414,567,417,569,419,572,423,573,427,573,431,571,434,569,437,566,440,563,441,560,441,557,441,555"
            }, {
                "title": "PZpm_R_apex",
                "coords": "371,562,376,615,378,614,383,613,387,612,392,610,397,609,403,608,405,608,405,573,401,574,401,577,400,579,398,581,394,581,389,580,385,579,381,576,379,574,377,571"
            }, {
                "title": "PZpm_L_apex",
                "coords": "406,608,405,574,407,574,408,577,409,579,413,581,417,581,421,580,424,578,429,575,433,572,435,569,438,567,439,565,434,614,431,613,428,612,424,611,421,610,416,609,411,609"
            }, {
                "title": "PZpl_R_apex",
                "coords": "375,614,372,616,368,616,362,616,357,614,352,612,350,609,347,607,344,604,342,600,339,595,338,591,336,586,334,582,333,577,333,573,332,570,332,566,371,554"
            }, {
                "title": "PZpl_L_apex",
                "coords": "434,613,438,614,442,614,446,615,450,614,454,613,457,611,460,608,463,605,466,601,469,597,471,592,473,588,474,583,476,577,477,573,478,568,478,566,442,553"
            }, {
                "title": "PZa_R_apex",
                "coords": "371,553,370,550,370,546,372,541,374,537,375,534,377,532,378,528,379,524,377,521,375,519,372,518,369,517,366,516,363,518,360,520,357,521,353,524,351,526,348,529,346,532,343,535,340,538,338,541,337,545,335,547,334,552,333,556,332,559,332,562,332,566"
            }, {
                "title": "PZa_L_apex",
                "coords": "442,554,442,551,442,547,441,544,439,540,438,536,435,533,434,529,433,526,433,523,435,520,440,518,443,518,446,518,449,520,451,522,454,523,457,525,459,527,461,530,463,532,466,534,469,537,470,540,473,544,474,547,475,551,477,555,478,558,478,561,478,563,478,567"
            }, {
                "title": "Urethra_ _ ",
                "coords": "405,676,397,678,391,680,386,687,385,692,385,699,389,705,393,709,399,712,406,713,414,711,418,708,422,704,424,701,425,694,424,687,421,682,417,679,411,677"
            }, {
                "title": "SV_R_ ",
                "coords": "404,67,401,70,397,72,392,71,389,71,387,69,383,71,376,72,370,73,365,72,361,71,356,72,350,73,346,71,342,69,339,66,337,66,332,67,328,65,323,63,320,60,317,58,314,55,313,52,308,51,301,48,298,45,296,41,295,37,294,32,294,29,293,24,293,19,296,14,300,11,305,9,312,7,316,7,323,7,327,9,330,12,334,14,338,15,341,16,344,20,345,22,349,23,355,25,361,27,367,31,369,33,372,35,375,36,380,39,385,45,386,48,388,52,390,51,395,52,399,54,402,57,402,60,404,62"
            }, {
                "title": "SV_L_ ",
                "coords": "518,7,520,11,524,16,523,23,522,28,522,35,519,41,516,46,512,50,509,52,507,53,505,56,501,61,497,63,492,66,488,67,483,67,480,65,479,68,474,72,469,73,465,73,460,72,458,71,454,72,448,73,445,72,440,72,436,71,433,70,429,71,426,72,420,72,418,69,417,65,419,62,421,59,424,56,428,53,431,52,434,49,438,45,440,40,446,36,449,32,454,30,457,26,459,23,465,21,468,19,470,19,472,17,474,14,479,12,483,8,488,5,492,3,496,2,504,1,512,4"
            }
        ];
    }
    /**
     * keyPressHandler hangs on the window of the application, and listens to keypresses.
     * If there is a keyboard key pressed, he will call the hotKeys function in the pagecontroller to handle the keypress.
     * @param event The keydown event.
     */
    MapComponent.prototype.keyPressHandler = function (event) {
        //Call the hotkeys function of the pagecontroller when a key is pressed on the keyboard
        this.pagectrl.hotKeys(event.keyCode);
    };
    /**
     * when a sector on the sector map is left clicked, this function handles that event.
     *
     * After the left click, we get the title of the clicked sector. We split the title up, and set region, level, side.
     * Then we set the selected entry in the pagecontroller to the clicked sector map. This is needed to adjust the score of the correct entry.
     * After this, we attempt to add this sector to the table, we call addtoTable().
     *
     * @param event The click event.
     */
    MapComponent.prototype.leftClickHandler = function (event) {
        //split the title and bind the values to region, side, level
        _a = event.target.getAttribute("title").split("_"), this.region = _a[0], this.side = _a[1], this.level = _a[2];
        //set the selected entry in the pagecontroller to this sector
        this.pagectrl.selectedentry = {
            region: this.region,
            level: this.level,
            side: this.side
        };
        //attempt to add this sector to the table
        this.addtoTable();
        var _a;
    };
    /**
     * When a sector on the sector map is right clicked, this function handles that event.
     *
     * After the right click, we get the title of the clicked sector. We split the title up, and set the region, level, side.
     * Then we set the selected entry in the pagecontroller to the clicked sector map. This is needed to adjust the score of the correct entry.
     * After this, we attempt to add a finding for this sector, we call addFinding().
     *
     * @param event The contextmenu event.
     */
    MapComponent.prototype.rightClickHandler = function (event) {
        //split the title and vind the values to region, side, level
        _a = event.target.getAttribute("title").split("_"), this.region = _a[0], this.side = _a[1], this.level = _a[2];
        //set the selected entry in the pagecontroller to this sector
        this.pagectrl.selectedentry = {
            region: this.region,
            level: this.level,
            side: this.side
        };
        //attempt to add a finding for this sector
        this.addFinding();
        var _a;
    };
    /**
     *
     * NOT USED ANYMORE: unwanted page scrolling when we have a large table. Adjusting score is now done with the keyboard.
     *
     *
     * When a sector is hovered over and we scroll with the scrollwheel, this function handles that event.
     *
     * When we scroll, we can quickly adapt the score of a sector we're hovering over.
     * @param event The mousewheel event.
     */
    MapComponent.prototype.scrollHandler = function (event) {
        //use the scroll direction of the event to adjust the score in the pagecontroller
        this.pagectrl.adjustScore(event.deltaY);
    };
    /**
     * When we attempt to add a new entry to the table we call addtoTable.
     *
     * This function will check if the region, level and side already exist in the table.
     * If they don't, add it to the data in the dataservice (this will add it to the table dynamically)
     * The findings of the entry are all default on 'x'
     * The selected method in the pagecontroller will be set on 'T2'
     *
     * If we found an entry, we just set the findings index on 0 and highlight that entry in the table.
     *
     * A sector can have multiple findings, that's why we set the findings index on 0, so we are at the top of that entry.
     */
    MapComponent.prototype.addtoTable = function () {
        //check if an entry already exists with this region, level and side
        var _a = this.dataservice.findEntry(this.region, this.level, this.side), foundentry = _a[0], i = _a[1];
        //if it doesn't
        if (!foundentry) {
            //add it to the data
            this.dataservice.getData().push({
                region: this.region,
                level: this.level,
                side: this.side,
                findings: [{
                        T2: 'x',
                        DWI: 'x',
                        DCE: 'x',
                        PIRADS: 'x',
                        volume: 0,
                        comment: '',
                    }],
                //also keep an index where in the data it is
                index: i
            });
            //set the selected method to T2
            this.dataservice.setMethod('T2');
        }
        //set the findings index to 0, this is also the case if we found an entry with this name
        this.dataservice.setFindingsIndex(0);
        //highlight the entry in the table
        this.pagectrl.highlightEntry(this.region, this.level, this.side);
    };
    ;
    /**
     * After we right clicked on a sector, we will attempt to add a finding to the table.
     *
     * First we will see if the entry with the region, level and side already exists.
     * If it does, see how many entries we already got for that sector. If it's more that 9, don't do anything.
     * If it's more than 4, but less than 9, ask for confirmation. When it's less than 4, add an extra finding to the table.
     *
     * If we don't find an entry of that sector, add the sector to the table by calling addtoTable().
     */
    MapComponent.prototype.addFinding = function () {
        //this is the string you'll see when you try to add more than 4 findings to the table
        var confirmstring = this.translate.get("TABLE.DIALOG");
        //check if an entry already exists with this region, level and side
        var _a = this.dataservice.findEntry(this.region, this.level, this.side), foundentry = _a[0], i = _a[1];
        //if it does
        if (foundentry) {
            //get the amount of findings we got for this region
            var length_1 = this.dataservice.getData()[i].findings.length;
            //if it's more than 9
            if (length_1 >= 9) {
                //catch the right click
                event.preventDefault();
                event.stopPropagation();
                //and do nothing
                return;
            }
            //if its between 4 and 9, we ask for confirmation, or if its below 4
            if ((length_1 >= 4 && window.confirm(confirmstring.value)) || (length_1 < 4)) {
                //add the sector to the data
                this.dataservice.getData()[i].findings.push({
                    T2: 'x',
                    DWI: 'x',
                    DCE: 'x',
                    PIRADS: 'x',
                    volume: null,
                    comment: ''
                });
                //set the findings index to the new finding
                this.dataservice.setFindingsIndex(this.dataservice.getData()[i].findings.length - 1);
            }
        }
        else {
            //add the sector to the table
            this.addtoTable();
        }
        //highlight the sector in the table
        this.pagectrl.highlightEntry(this.region, this.level, this.side);
        //catch the right click
        event.preventDefault();
        event.stopPropagation();
    };
    MapComponent = __decorate([
        core_1.Component({
            selector: 'map-component',
            templateUrl: '../../templates/map/map.template.html'
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, page_controller_1.PageController, ng2_translate_1.TranslateService])
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
//# sourceMappingURL=D:/Users/EYWGN/Documents/Masterproef/agility_schedar/pirads/src/app/components/map/map.component.js.map