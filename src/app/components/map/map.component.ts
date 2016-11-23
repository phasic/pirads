import {Component} from '@angular/core';
import {DataService} from "../../services/data.service";
import {TranslateService} from "ng2-translate";
import {PageController} from "../../services/page.controller";
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
@Component({
  selector: 'map-component',
  templateUrl: '../../templates/map/map.template.html'
})
export class MapComponent{
  /**
   * The constructor will initialize the following
   * @param dataservice This service contains all the data. This is used to set and get the correct data we want.
   * @param pagectrl  This service contains all the shared functionality. This service mainly handles the hotkeys and adjusting scores/methods/finding (used for navigation through the table)
   * @param translate This variable contains the TranslateService, and will be used to translate the placeholder values to the right language.
   */
  constructor(private dataservice: DataService, private pagectrl: PageController, private translate: TranslateService){
  }

  /**
   * This array contains all the definitions of the areas of the sector map.
   *
   * Evert area is defined by a title and its corresponding coordinates.
   * @type {{title: string; coords: string}[]}
   */
  private areas: Array<any> = [{
    "title": "AS_R_base",
    "coords": "450,257,449,253,446,246,441,238,437,234,432,232,428,233,431,226,440,218,447,211,452,206,461,200,469,195,478,191,490,186,505,182,521,178,536,177,546,176,556,176,562,176,560,180,559,188,556,199,556,206,555,213,554,219,554,227,553,230,551,226,548,220,544,214,539,210,534,204,527,201,519,199,511,197,502,198,493,199,486,202,479,208,472,213,465,220,459,228,454,237"
  },{
    "title": "AS_L_base",
    "coords": "561,177,563,189,565,199,566,211,567,222,567,236,570,228,574,220,578,215,582,210,587,206,596,201,605,199,614,199,624,199,634,203,643,207,651,213,657,220,664,228,667,237,669,247,670,256,670,266,668,275,672,267,675,254,678,246,681,239,686,233,691,232,691,229,687,222,680,214,672,208,661,200,651,194,637,188,623,183,599,179"
  },{
    "title": "TZa_R_base",
    "coords": "454,275,452,266,451,255,452,252,453,245,457,235,462,225,469,218,477,211,486,204,496,200,507,198,519,199,530,204,537,208,543,215,547,220,552,227,554,236,555,249,557,257,558,265,560,275"
  },{
    "title": "TZa_L_base",
    "coords": "563,274,565,259,568,235,574,220,584,209,599,199,615,197,630,201,643,207,653,214,662,226,668,239,670,253,670,267,667,275"
  },{
    "title": "TZp_R_base",
    "coords": "454,276,459,286,467,294,481,302,492,306,508,307,523,306,542,304,556,304,560,303,561,276"
  },{
    "title": "TZp_L_base",
    "coords": "561,275,669,274,662,284,656,292,642,300,631,302,615,304,602,304,586,303,561,302"
  },{
    "title": "CZ_R_base",
    "coords": "457,281,463,309,470,333,487,356,505,368,528,377,547,379,560,379,561,304,544,303,525,308,501,306,483,304,466,297"
  },{
    "title": "CZ_L_base",
    "coords": "560,303,585,306,619,305,647,298,661,288,669,278,659,308,650,335,642,350,629,363,613,375,596,375,575,379,561,378"
  },{
    "title": "PZpl_R_base",
    "coords": "405,290,455,276,465,316,475,342,487,357,505,369,520,373,534,376,507,377,471,372,449,364,428,356,415,342,409,320"
  },{
    "title": "PZpl_L_base",
    "coords": "671,278,718,295,713,324,705,336,693,346,679,358,658,366,633,372,612,375,628,364,638,357,646,344,653,331"
  },{
    "title": "PZa_R_base",
    "coords": "406,290,410,270,415,254,423,242,432,234,441,238,449,249,451,262,451,271,453,274"
  },{
    "title": "PZa_L_base",
    "coords": "671,274,677,256,683,240,687,232,697,236,701,244,708,258,714,274,715,288,717,296"
  },{
    "title": "AS_R_mid",
    "coords": "498,485,495,481,489,477,491,473,503,468,515,463,531,458,549,454,561,454,561,540,558,540,559,527,557,514,556,505,553,495,547,486,542,480,535,477,527,474,519,474,507,480"
  },{
    "title": "AS_L_mid",
    "coords": "566,538,566,531,565,521,566,510,569,501,573,490,580,484,588,478,596,476,607,478,617,482,623,487,627,489,633,475,627,470,613,463,599,459,588,456,569,453,561,452,561,462,562,478,561,492,561,539"
  },{
    "title": "TZa_R_mid",
    "coords": "467,539,469,526,473,514,479,504,487,498,494,489,503,484,511,478,525,476,534,476,544,481,551,490,555,500,559,509,559,520,558,530,557,539"
  },{
    "title": "TZa_L_mid",
    "coords": "566,538,565,529,565,518,567,509,571,498,573,492,579,484,584,480,593,476,603,476,617,480,625,487,634,494,641,502,649,512,654,522,657,531,657,539,655,539,652,540"
  },{
    "title": "TZp_R_mid",
    "coords": "466,539,470,557,475,570,481,580,493,588,506,590,522,589,533,582,542,574,549,564,555,552,557,543,557,539"
  },{
    "title": "TZp_L_mid",
    "coords": "567,539,569,550,572,560,577,570,584,578,598,588,611,592,624,592,636,588,647,577,654,563,657,551,657,543,657,540"
  },{
    "title": "PZpm_R_mid",
    "coords": "471,565,484,638,507,645,531,648,561,649,561,569,552,573,546,579,541,584,538,583,538,580,527,585,514,589,504,590,493,589,487,587,479,580"
  },{
    "title": "PZpm_L_mid",
    "coords": "560,570,561,649,585,648,608,644,625,642,635,639,651,571,641,584,631,590,619,592,605,591,595,588,589,584,584,585,578,584,573,579,568,573"
  },{
    "title": "PZpl_R_mid",
    "coords": "429,558,466,540,485,639,465,629,451,618,437,597"
  },{
    "title": "PZpl_L_mid",
    "coords": "659,540,691,557,683,598,672,612,651,630,634,639"
  },{
    "title": "PZa_R_mid",
    "coords": "430,557,433,536,439,523,449,507,459,495,474,481,483,476,489,476,495,480,498,485,487,495,477,509,469,523,467,538"
  },{
    "title": "PZa_L_mid",
    "coords": "658,541,655,528,649,513,639,502,632,492,629,489,634,475,645,481,657,494,665,502,674,512,682,528,688,541,691,556,690,558"
  },{
    "title": "AS_R_apex",
    "coords": "501,745,509,746,516,747,520,751,519,761,516,770,521,766,526,762,532,758,541,754,550,757,556,765,559,774,560,784,559,794,557,802,552,811,550,815,555,814,559,813,560,731,549,731,540,733,522,737"
  },{
    "title": "AS_L_apex",
    "coords": "619,746,609,747,602,750,601,757,601,764,594,760,587,757,579,756,572,759,567,766,567,771,565,777,565,786,565,793,566,797,568,805,572,811,575,814,570,815,564,813,560,813,560,732,568,732,588,735,602,738"
  },{
    "title": "TZa_R_apex",
    "coords": "510,796,511,787,512,781,516,773,522,767,528,760,535,755,543,754,554,760,559,770,560,781,559,791,558,796"
  },{
    "title": "TZa_L_apex",
    "coords": "565,796,565,790,564,781,565,775,567,768,573,760,580,756,589,757,596,761,603,768,611,780,614,789,614,797"
  },{
    "title": "TZp_R_apex",
    "coords": "511,796,514,808,518,815,525,820,536,820,546,818,552,812,556,805,558,797"
  },{
    "title": "TZp_L_apex",
    "coords": "566,798,569,805,573,814,581,820,593,823,602,822,609,817,613,807,614,802,614,797"
  },{
    "title": "PZpm_R_apex",
    "coords": "512,813,517,886,526,883,539,880,551,877,560,876,560,825,555,831,551,836,547,839,534,835,525,830,517,823"
  },{
    "title": "PZpm_L_apex",
    "coords": "560,823,560,875,572,876,585,879,596,882,602,884,610,815,602,821,596,828,587,835,580,837,569,837,566,836,566,832,564,828"
  },{
    "title": "PZpl_R_apex",
    "coords": "455,815,458,838,470,864,481,877,498,886,512,886,517,884,509,797"
  },{
    "title": "PZpl_L_apex",
    "coords": "614,798,603,886,621,888,635,881,644,873,655,859,662,842,666,822,666,817"
  },{
    "title": "PZa_R_apex",
    "coords": "455,816,456,804,461,788,466,778,473,769,480,761,490,753,500,747,510,746,518,749,520,755,519,765,516,773,512,781,508,789,508,797"
  },{
    "title": "PZa_L_apex",
    "coords": "603,766,603,758,602,752,611,747,622,746,633,753,648,766,657,780,661,791,664,801,665,813,664,815,649,811,637,805,629,802,620,799,617,797,615,792,615,784,607,774"
  },{
    "title": "Urethra_ _ ",
    "coords": "539,984,550,977,565,976,576,979,583,986,588,998,586,1009,579,1018,571,1023,560,1026,549,1024,541,1019,536,1013,532,1004,533,995"
  },{
    "title": "SV_R_ ",
    "coords": "553,97,543,98,534,95,532,94,528,96,522,99,512,100,501,98,496,96,493,99,481,100,472,99,467,95,464,91,460,92,453,92,443,91,437,86,434,82,428,77,426,73,425,71,418,71,410,69,404,63,401,55,399,42,400,37,396,32,396,23,397,17,401,11,406,8,412,5,420,4,429,3,437,3,443,7,447,11,453,14,460,15,462,16,467,18,470,24,470,27,474,26,483,28,488,29,493,32,500,37,506,42,506,45,511,45,516,47,522,49,525,52,528,59,530,65,532,68,537,68,546,70,552,72,555,79,557,85,559,90,559,95"
  },{
    "title": "SV_L_ ",
    "coords": "573,92,575,83,580,72,587,67,599,67,603,59,608,51,618,46,624,44,630,36,638,31,645,28,654,26,661,27,664,18,670,14,681,13,688,6,700,1,711,2,720,4,728,7,734,13,735,19,735,28,733,33,733,40,732,50,730,60,725,66,720,68,711,69,707,69,704,75,698,82,690,87,684,90,675,90,669,88,664,94,658,98,653,98,644,99,639,95,635,94,630,96,620,100,612,98,603,95,601,93,597,94,590,97,583,97,578,96"
  }
  ];

  /**
   * This string contains the region name, as shown on the sector map.
   *
   * We get this value of the title of the clicked sector.
   */
  private region: string;
  /**
   * This string contains the level. Base, mid or apex.
   *
   * We get this value of the title of the clicked sector.
   */
  private level: string;
  /**
   * This string contains the side. Left or right.
   *
   * We get this value of the title of the clicked sector.
   */
  private side: string;

  /**
   * keyPressHandler hangs on the window of the application, and listens to keypresses.
   * If there is a keyboard key pressed, he will call the hotKeys function in the pagecontroller to handle the keypress.
   * @param event The keydown event.
   */
  keyPressHandler(event: any): void{
    //Call the hotkeys function of the pagecontroller when a key is pressed on the keyboard
    this.pagectrl.hotKeys(event.keyCode);
  }

  /**
   * when a sector on the sector map is left clicked, this function handles that event.
   *
   * After the left click, we get the title of the clicked sector. We split the title up, and set region, level, side.
   * Then we set the selected entry in the pagecontroller to the clicked sector map. This is needed to adjust the score of the correct entry.
   * After this, we attempt to add this sector to the table, we call addtoTable().
   *
   * @param event The click event.
   */
  leftClickHandler(event: any): void{
    //split the title and bind the values to region, side, level
    [this.region, this.side, this.level] = event.target.getAttribute("title").split("_");
//set the selected entry in the pagecontroller to this sector
    this.pagectrl.selectedentry = {
      region: this.region,
      level: this.level,
      side: this.side
    };
//attempt to add this sector to the table
    this.addtoTable();
  }

  /**
   * When a sector on the sector map is right clicked, this function handles that event.
   *
   * After the right click, we get the title of the clicked sector. We split the title up, and set the region, level, side.
   * Then we set the selected entry in the pagecontroller to the clicked sector map. This is needed to adjust the score of the correct entry.
   * After this, we attempt to add a finding for this sector, we call addFinding().
   *
   * @param event The contextmenu event.
   */
  rightClickHandler(event: any): void{
    //split the title and vind the values to region, side, level
    [this.region, this.side, this.level] = event.target.getAttribute("title").split("_");
//set the selected entry in the pagecontroller to this sector
    this.pagectrl.selectedentry = {
      region: this.region,
      level: this.level,
      side: this.side
    };
//attempt to add a finding for this sector
    this.addFinding();
  }

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
  scrollHandler(event: any): void{
    //use the scroll direction of the event to adjust the score in the pagecontroller
    this.pagectrl.adjustScore(event.deltaY);
  }

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
  addtoTable(): void{
    //check if an entry already exists with this region, level and side
    let [foundentry, i] = this.dataservice.findEntry(this.region, this.level, this.side);
//if it doesn't
    if(!foundentry){
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

  /**
   * After we right clicked on a sector, we will attempt to add a finding to the table.
   *
   * First we will see if the entry with the region, level and side already exists.
   * If it does, see how many entries we already got for that sector. If it's more that 9, don't do anything.
   * If it's more than 4, but less than 9, ask for confirmation. When it's less than 4, add an extra finding to the table.
   *
   * If we don't find an entry of that sector, add the sector to the table by calling addtoTable().
   */
  addFinding(): void{
    //this is the string you'll see when you try to add more than 4 findings to the table
    let confirmstring: any = this.translate.get("TABLE.DIALOG");
//check if an entry already exists with this region, level and side
    let [foundentry, i] = this.dataservice.findEntry(this.region, this.level, this.side);
//if it does
    if(foundentry){
      //get the amount of findings we got for this region
      let length: number = this.dataservice.getData()[i].findings.length;
      //if it's more than 9
      if(length >= 9){
        //catch the right click
        event.preventDefault();
        //and do nothing
        return;
      }
      //if its between 4 and 9, we ask for confirmation, or if its below 4
      if ((length >= 4 && window.confirm(confirmstring.value)) || (length < 4)) {
        //add the sector to the data
        this.dataservice.getData()[i].findings.push(
          {
            T2: 'x',
            DWI: 'x',
            DCE: 'x',
            PIRADS: 'x',
            volume: null,
            comment: ''
          }
        );
        //set the findings index to the new finding
        this.dataservice.setFindingsIndex(this.dataservice.getData()[i].findings.length-1);
      }
    }
//if we didn't find an entry of that sector
    else {
      //add the sector to the table
      this.addtoTable();
    }
//highlight the sector in the table
    this.pagectrl.highlightEntry(this.region, this.level, this.side);
//catch the right click
    event.preventDefault();
  }
}


