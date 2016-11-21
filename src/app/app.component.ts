import { Component } from '@angular/core';
/**
 * This is the main component. Once you open the page, this will be shown.
 *
 * By default the component has a HTML content of 'loading...', once all the elements are loaded, the component shows his content.
 *
 *      selector: 'my-app'
 *      templateUrl: './app.component.html'
 *      styleUrls: ['app.component.css']
 */
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

  /**
   * This handler disables the right clicks on the page. So the user doesn't see the right click menu.
   *
   * It prevents the default action of the right mouse click.
   * @param event
   */
  keyPressHandler(event: any){
    event.preventDefault();
  }
}

