import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from './components/mainpage/header/header.component';
import {HomeComponent} from './components/mainpage/home/home.component';
import {EventCardComponent} from './components/mainpage/event-card/event-card.component';
import {Overview1Component} from './components/events/overview1/overview1.component';
import {Overview2Component} from './components/events/overview2/overview2.component';
import {Overview3Component} from "./components/events/overview3/overview3.component";
import {Detail2Component} from './components/events/detail2/detail2.component';
import {AEventsService} from "./services/a-events.service";
import {Detail3Component} from "./components/events/detail3/detail3.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    EventCardComponent,
    Overview1Component,
    Overview2Component,
    Overview3Component,
    Detail2Component,
    Detail3Component,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule
  ],
  providers: [AEventsService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
