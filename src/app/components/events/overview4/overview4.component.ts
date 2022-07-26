import {Component, OnInit, Input} from '@angular/core';
import {AEvent} from "../../../models/a-event";
import {AEventsService} from "../../../services/a-events.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppComponent} from "../../../app.component";
import {elementAt} from "rxjs/operators";

@Component({
  selector: 'app-overview4',
  templateUrl: './overview4.component.html',
  styleUrls: ['./overview4.component.css']
})
export class Overview4Component implements OnInit {

  public selectedAEventId: number = -1;

  constructor(private router: Router, private route: ActivatedRoute ,private aEventService: AEventsService) {
    const paramId : number = this.route.snapshot.params['eventId'];

    if(paramId != undefined)
    this.selectedAEventId = paramId;
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

    const command = this.route.snapshot.params['eventId'] != undefined ? ['../',this.selectedAEventId] : [this.selectedAEventId];
    this.router.navigate(command, {relativeTo: this.route});
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
