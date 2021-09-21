import {Component, OnInit} from '@angular/core';
import {AEvent} from "../../../models/a-event";

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

  addRandomEvent() {
    this.aEvents.push(AEvent.createRandomAEvent());
  }

  onEventClicked(event: AEvent) {
    this.selectedAEvent = event;
  }

}
