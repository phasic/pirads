import {ElementRef, HostListener, Directive} from '@angular/core';
/**
 * Directive used to rescale the imagemaps when the page is rescaled. So the imagemaps keep corresponding the underlying sector map image.
 *
 *      selector: '[rwdimagemap]'
 *
 */
@Directive({
  selector: '[rwdimagemap]'
})
export class RwdImageMap {
  /**
   * The constructor will define the element, the image map, when initialized.
   *
   * After 100ms we will get the natural, unscaled, width of the image
   * @param elementRef
   */
  constructor( public elementRef: ElementRef){
    //wait 100ms
    setTimeout(() => {
      //get the width and height of the imagemap, then call rescale
      this.imgwidth = elementRef.nativeElement.naturalWidth;
      this.imgheight = elementRef.nativeElement.naturalHeight;
      this.rescale()
    }, 100);
  }
  /**
   * The current width of the image
   */
  public imgwidth: number;
  /**
   * The current height of the image
   */
  public imgheight: number;
  /**
   * When we resize the page, this will get called.
   *
   * When we resize, we need to rescale the imagemap, because this isn't inherently responsive unlike the underlying image.
   * @param event The resize event
   */
  @HostListener('window:resize',['$event'])
  onResize(event: Event): void{
    this.rescale();
  }
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
  rescale(){
    //get the current width
    let w: number = this.elementRef.nativeElement.width;
    //get the current height
    let h: number = this.elementRef.nativeElement.height;
    //calculate the wscale
    let wscale: number =  w / this.imgwidth;
    //calculate thehscale
    let hscale: number = h / this.imgheight;
    //get hte area elements
    let elements: any = this.elementRef.nativeElement.parentNode.getElementsByTagName("area");
    //iterate over all the found area elements
    for(let i = 0; i < elements.length; i++){
      //get the coordinates of an area and split them
      let coords: Array<number> = elements[i].coords.split(',');
      //run over all the coordinates
      for(let j = 0; j < coords.length; j++){
        //even
        if (j % 2 === 0){
          //multiply it by wscale
          coords[j] = coords[j] * wscale;
          //odd
        } else {
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
  }
}

