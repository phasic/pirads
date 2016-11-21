import { ElementRef, HostListener, Directive} from '@angular/core';
/**
 * Directive used to make an autosizing text box. When you type in the comment area,
 * the area will automatically grow vertically. This is to prevent scrolling.
 *
 *          selector: '[autosize]'
 *
 */
@Directive({
  selector: '[autosize]'
})
export class Autosize {
  /**
   * This function gets called when we are typing in the textarea, every time a letter is typed we call this.adjust().
   * @param textArea The textarea where we are typing in
   */
  @HostListener('input',['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  /**
   * The constructor will define the textarea element.
   * @param element
   */
  constructor(public element: ElementRef){
  }

  /**
   * When this directive is initialized (when a textarea is created, call this.adjust()).
   */
  ngOnInit(): void{
    this.adjust();
  }

  /**
   * Sets the overflow and height of the textarea. The height is depending on the scrollheight.
   */
  adjust(): void{
    this.element.nativeElement.style.overflow = 'hidden';
    this.element.nativeElement.style.height = 'auto';
    this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + "px";
  }
}
