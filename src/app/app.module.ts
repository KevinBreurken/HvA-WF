import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import { HeaderComponent } from './components/mainpage/header/header.component';
import { HomeComponent } from './components/mainpage/home/home.component';
import { EventCardComponent } from './components/mainpage/event-card/event-card.component';
import { Overview1Component } from './components/events/overview1/overview1.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    EventCardComponent,
    Overview1Component
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
