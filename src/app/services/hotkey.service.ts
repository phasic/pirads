import {Injectable} from "@angular/core";
import {Http, Response} from '@angular/http'

@Injectable()
export class HotkeyService {
  get hotkeys(): {method: {one: number; two: number; three: number}; finding: {one: number; two: number; three: number; four: number; five: number; six: number; seven: number; eight: number; nine: number}; scoring: {plus: number; minus: number}} {
    return this._hotkeys;
  }

  /**
   *
   * @param http used to read the json file
   */
  constructor(private http: Http) {
    http.get('assets/hotkeys.json')                //send a get request to the hotkeys.json file
      .map((res: Response) => res.json())         //get the response, parse it to jason
      .subscribe(res => {                         //makes an observable on res
        this._hotkeys = {                       //bind the hotkeys array
          method: {                          //sidebar hotkeys
            one : res["METHOD"]["ONE"].toLocaleUpperCase().charCodeAt(0),  //1 through 9
            two : res["METHOD"]["TWO"].toLocaleUpperCase().charCodeAt(0),  //charcodeat(0) gives the first letter of the returned string and takes the keycode of it
            three : res["METHOD"]["THREE"].toLocaleUpperCase().charCodeAt(0),
          },
          finding: {
            one : res["FINDING"]["ONE"].charCodeAt(0),
            two : res["FINDING"]["TWO"].charCodeAt(0),
            three : res["FINDING"]["THREE"].charCodeAt(0),
            four : res["FINDING"]["FOUR"].charCodeAt(0),
            five : res["FINDING"]["FIVE"].charCodeAt(0),
            six : res["FINDING"]["SIX"].charCodeAt(0),
            seven : res["FINDING"]["SEVEN"].charCodeAt(0),
            eight : res["FINDING"]["EIGHT"].charCodeAt(0),
            nine : res["FINDING"]["NINE"].charCodeAt(0)
          },
          scoring: {
            plus : res["SCORING"]["PLUS"].charCodeAt(0),
            minus: res["SCORING"]["MINUS"].charCodeAt(0)

          }
        };
      } );
  }

  /**
   * hotkeys array structure
   */
  private _hotkeys: {
    method: {
      one: number,
      two: number,
      three: number
    },
    finding: {
      one: number,
      two: number,
      three: number,
      four: number,
      five: number,
      six: number,
      seven: number,
      eight: number,
      nine: number
    },
    scoring: {
      plus: number,
      minus: number
    }
  };



}

