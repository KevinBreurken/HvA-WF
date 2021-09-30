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

  // public aEvents: AEvent[] = [];
  public selectedAEvent: any = null;

  constructor(private aEventService: AEventsService) {
  }

  ngOnInit(): void {
    // this.aEvents = this.aEventService.findAll()
  }

  allEvents() {
    return this.aEventService.findAll();
  }

  onAddEvent() {
   const newEvent = AEvent.createRandomAEvent();
    //Add a random event.
    this.aEventService.save(newEvent);
    //Select the last event.
    this.onEventClicked(newEvent);
  }

  onEventClicked(event: AEvent) {
    this.selectedAEvent = event;
  }

  removeEvent(event: AEvent) {
    this.aEventService.deleteById(event.id);
    this.selectedAEvent = null;
  }
}
