import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
import { AppComponent } from './app.component';

import { Ng2BootstrapModule }   from 'ng2-bootstrap/ng2-bootstrap';
import {TranslateModule, TranslateService, TranslateStaticLoader, TranslateLoader} from   'ng2-translate/ng2-translate';
//Map Components
import { MapComponent }         from './components/map/map.component';
import { LegendComponent }      from './components/map/legend.component';
import { RwdImageMap }          from "./directives/imagemap.directive";
//Table Components
import { TableComponent }       from './components/table/table.component';
import { Autosize }             from './directives/autosize.directive';
import { OrderBy }              from './components/table/orderby';
//Data Service
import { DataService}           from './services/data.service';
import {PageController} from "./services/page.controller";
import {HotkeyService} from "./services/hotkey.service";

/**
 * Module that declares all the used components and modules. Imported or self-made
 */
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LegendComponent,
    RwdImageMap,
    TableComponent,
    Autosize,
    OrderBy
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2BootstrapModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
      deps: [Http]
    })
  ],
  providers: [DataService, PageController, HotkeyService],
  bootstrap: [AppComponent]
})
/**
 * AppModule will use AppComponent at bootstrap. And will set up the TranslateService
 */
export class AppModule {
  /**
   * Defines the different languages for the TranslateService.
   *
   * Sets a default language when a language isn't found (english)
   *
   * The language we are going to use, will the same as the browser language
   * @param translate
   */
  constructor(translate: TranslateService){
    translate.addLangs(["en", "fr", "nl"]);
    translate.setDefaultLang('en');
    translate.use(translate.getBrowserLang());
  }
}



