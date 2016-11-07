import {Injectable} from "@angular/core";

@Injectable()
export class DataService {
  private data: {
    region: string;
    level: string;
    side: string;
    findings: {
      T2: string;
      DWI: string;
      DCE: string;
      PIRADS: string;
      volume: string;
      comment:string
    }[];
    index: number
  }[];
  private method : string;
  private findingsindex: number = 0;
  constructor(){
    this.setData([]);
  }

  setData(data: any): void{
    this.data = data;
  }
  getData(): any{
    return this.data;
  }

  getFindings(index: number): any{
    return this.data[index].findings;
  }


  setMethod(method: string): void{
    this.method = method;
  }
  getMethod(): string{
    return this.method;
  }

  setFindingsIndex(findingsindex: number): void{
    this.findingsindex = findingsindex;
  }
  getFindingsIndex(): number{
    return this.findingsindex;
  }
  getFinding(idata: number, ifindings: number): any{
    return this.data[idata].findings[ifindings];
  }
  findEntry(region: string, level: string, side: string): [boolean,number]{
    let i: number;
    let entry: any;
    for (i = 0; i < this.getData().length; i++){          //run over the data to check for doubles
      entry = this.getData()[i];
      if((region == entry.region) && (side == entry.side) && (level == entry.level )){
        return [true, i];
      }
    }
    return [false,i];
  }
  setScore(region: string, level: string, side: string, index: number, method: string, score: string){
    let [foundentry, i] = this.findEntry(region,level,side);
    this.data[i].findings[index][method] = score;
    this.calcPirads(region, i);
  }

  calcPirads(region: string, index: number): void{
    var finding: any = this.getFinding(index,this.findingsindex);
    let {T2: T2, DWI: DWI, DCE: DCE} = finding;
    let isTransition: boolean = !'t'.localeCompare(region.charAt(0).toLowerCase());
      if (isTransition) {
        if (T2 !== '3') {
          finding.PIRADS = T2;
        }
        else {
          if (DWI === 'x') {
            if (DCE === '-') {
              finding.PIRADS = '3';
            }
            else {
              finding.PIRADS = '4';
            }
          }
          else {
            if (parseInt(DWI) <= 4) {
              finding.PIRADS = '3';
            }
            else {
              finding.PIRADS = '4';
            }
          }
        }
      }

      else {
        if (DWI === 'x') {
          if (T2 === '3') {
            if (DCE === '-') {
              finding.PIRADS = '3';
            }
            else {
              finding.PIRADS = '4';
            }
          }
          else {
            finding.PIRADS = T2;
          }
        }
        else if (DWI === '3') {
          finding.PIRADS = {
            'x' : DWI,
            '-' : '3',
            '+' : '4'
          }[DCE];
        }
        else {
          finding.PIRADS = DWI;
        }
      }

  }





}
