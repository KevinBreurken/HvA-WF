import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from './components/mainpage/header/header.component';
import {HomeComponent} from './components/mainpage/home/home.component';
import {EventCardComponent} from './components/mainpage/event-card/event-card.component';
import {Overview1Component} from './components/events/overview1/overview1.component';
import {Overview2Component} from './components/events/overview2/overview2.component';
import {Overview3Component} from "./components/events/overview3/overview3.component";
import {Detail2Component} from './components/events/detail2/detail2.component';
import {AEventsService} from "./services/a-events.service";
import {Detail3Component} from "./components/events/detail3/detail3.component";
import {RouterModule, Routes} from "@angular/router";
import {ErrorComponent} from './components/mainpage/error/error.component';
import {Overview4Component} from './components/events/overview4/overview4.component';
import {Detail4Component} from './components/events/detail4/detail4.component';
import {Detail5Component} from "./components/events/detail5/detail5.component";
import {Overview5Component} from "./components/events/overview5/overview5.component";
import {AEventsSbService} from "./services/a-events-sb.service";
import {HeaderSbComponent} from './components/mainpage/header-sb/header-sb.component';
import {SignOnComponent} from './components/sign-on/sign-on.component';
import {AuthSbInterceptorService} from "./services/auth-sb-interceptor.service";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'sign-on', component: SignOnComponent},
  {path: 'events/overview1', component: Overview1Component},
  {path: 'events/overview2', component: Overview2Component},
  {path: 'events/overview3', component: Overview3Component},
  {path: 'events/overview4', component: Overview4Component},
  {path: 'events/overview4/:eventId', component: Overview4Component},
  {path: 'events/overview5', component: Overview5Component},
  {path: 'events/overview5/:eventId', component: Overview5Component},
  {path: '**', component: ErrorComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    EventCardComponent,
    Overview1Component,
    Overview2Component,
    Overview3Component,
    Overview5Component,
    Detail2Component,
    Detail3Component,
    ErrorComponent,
    Overview4Component,
    Detail4Component,
    Detail5Component,
    HeaderSbComponent,
    SignOnComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AEventsService, AEventsSbService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthSbInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
