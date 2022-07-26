import {Component, OnInit, Input} from '@angular/core';
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
    const newEvent = AEvent.createRandomAEvent();
    //Add a random event.
    this.aEventService.save(newEvent);
    //Select the last event.
    this.onEventClicked(newEvent);
  }

  onEventClicked(event: AEvent) {
    this.selectedAEventId = event.id;
  }


  cancelEvent(eventId: number) {
    this.deselectEventSelection();
  }

  removeEvent(eventId: number) {
    this.aEventService.deleteById(eventId);
    this.deselectEventSelection();
  }

  deselectEventSelection(){
    this.selectedAEventId = -1;
  }
}
