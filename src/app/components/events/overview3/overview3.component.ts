import {Component, OnInit} from '@angular/core';
import {AEvent} from "../../../models/a-event";
import {Detail2Component} from "../detail2/detail2.component";
import {AEventsService} from "../../../services/a-events.service";

@Component({
  selector: 'app-overview3',
  templateUrl: './overview3.component.html',
  styleUrls: ['./overview3.component.css']
})
export class Overview3Component implements OnInit {

  public selectedAEventId: number = -1;

  constructor(private aEventService: AEventsService) {
  }

  ngOnInit(): void {
  }

  allEvents() {
    return this.aEventService.findAll();
  }

  onAddEvent() {
    //Add a random event.
    this.aEventService.findAll().push(AEvent.createRandomAEvent());
    //Select the last event.
    this.onEventClicked(this.aEventService.findAll()[this.aEventService.findAll().length-1]);
  }

  onEventClicked(event: AEvent) {
    this.selectedAEventId = event.id;
  }

  removeEvent(eventId: number) {
    this.aEventService.deleteById(eventId);
    this.selectedAEventId = -1;
  }
}
