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

  // public aEvents: AEvent[] = []
  public selectedAEvent: any = null;

  //TODO: Ask how to make this accessible in overview3 view, without using public.
  constructor(public aEventService: AEventsService) {
  }

  ngOnInit(): void {
  }

  onAddEvent() {
    //Add a random event.
    this.aEventService.aEventsList.push(AEvent.createRandomAEvent());
    //Select the last event.
    this.onEventClicked(this.aEventService.aEventsList[this.aEventService.aEventsList.length-1])
  }

  onEventClicked(event: AEvent) {
    this.selectedAEvent = event;
  }

  removeEvent(event: AEvent) {
    this.aEventService.deleteById(event.id);
    this.selectedAEvent = null;
  }
}
