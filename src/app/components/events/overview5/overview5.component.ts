import {Component, OnInit, Input, OnDestroy, ViewChild} from '@angular/core';
import {AEvent} from "../../../models/a-event";
import {ActivatedRoute, Router} from "@angular/router";
import {AppComponent} from "../../../app.component";
import {elementAt} from "rxjs/operators";
import {AEventsSbService} from "../../../services/a-events-sb.service";
import {Detail5Component} from "../detail5/detail5.component";

@Component({
  selector: 'app-overview5',
  templateUrl: './overview5.component.html',
  styleUrls: ['./overview5.component.css']
})
export class Overview5Component implements OnInit, OnDestroy {

  @ViewChild("detail")
  detail: Detail5Component | undefined;

  events: AEvent[] = []

  public selectedAEventId: number = -1;

  constructor(private router: Router, private route: ActivatedRoute, private aEventService: AEventsSbService) {
    const paramId: number = this.route.snapshot.params['eventId'];

    if (paramId != undefined)
      this.selectedAEventId = paramId;
  }

  ngOnInit(): void {
    this.aEventService.restGetAEvents().subscribe(data => {
      this.events = this.aEventService.findAll();
      this.detail?.onElementsLoaded();
    });
  }

  onAddEvent() {
    const newEvent = AEvent.createRandomAEvent();
    //Add a random event.
    this.aEventService.save(newEvent).subscribe(data => {
      newEvent.id = data.id;
      this.onEventClicked(newEvent);
    });
    //Select the last event.
  }

  onEventClicked(event: AEvent) {
    this.selectedAEventId = event.id;

    const command = this.route.snapshot.params['eventId'] != undefined ? ['../', this.selectedAEventId] : [this.selectedAEventId];
    this.router.navigate(command, {relativeTo: this.route});
  }

  cancelEvent(eventId: number) {
    this.deselectEventSelection();
  }

  removeEvent(eventId: number) {
    this.aEventService.deleteById(eventId);
    this.deselectEventSelection();
  }

  deselectEventSelection() {
    this.selectedAEventId = -1;
  }

  ngOnDestroy(): void {

  }
}
