import { Component } from '@angular/core';
import {AEventsService} from "./services/a-events.service";
import {AEventsSbService} from "./services/a-events-sb.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-first-app';

}
