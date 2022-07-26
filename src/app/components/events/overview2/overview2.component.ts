import {Component, OnInit} from '@angular/core';
import {AEvent} from "../../../models/a-event";
import {Detail2Component} from "../detail2/detail2.component";

@Component({
  selector: 'app-overview2',
  templateUrl: './overview2.component.html',
  styleUrls: ['./overview2.component.css']
})
export class Overview2Component implements OnInit {

  public aEvents: AEvent[] = []
  public selectedAEvent: any = null;

  constructor() {
  }

  ngOnInit(): void {
    this.aEvents = [];
    for (let i = 0; i < 9; i++) {
      this.addRandomEvent();
    }
  }

  onAddEvent() {
    this.addRandomEvent();
    //Select the last event.
    this.onEventClicked(this.aEvents[this.aEvents.length - 1]);
  }

  addRandomEvent() {
    this.aEvents.push(AEvent.createRandomAEvent());
  }


  onEventClicked(event: AEvent) {
    this.selectedAEvent = event;
  }

  removeEvent(event: AEvent) {
    this.aEvents.splice(this.aEvents.indexOf(event), 1)
    this.selectedAEvent = null;
  }
}
