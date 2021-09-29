import {Component, Input, Output, OnInit, EventEmitter, Inject} from '@angular/core';
import {AEvent, aEventStatus} from "../../../models/a-event";
import {AEventsService} from "../../../services/a-events.service";

@Component({
  selector: 'app-detail3',
  templateUrl: './detail3.component.html',
  styleUrls: ['./detail3.component.css']
})
export class Detail3Component implements OnInit {

  @Input() editedAEventId: number = -1;
  @Output() eventIdOutput = new EventEmitter<number>();

  selectValues = Object.values(aEventStatus);

  constructor(private aEventService: AEventsService) {
  }

  ngOnInit(): void {
  }

  getCurrentEvent(): AEvent {
    return <AEvent>this.aEventService.findById(this.editedAEventId);
  }

  onDeleteEvent() {
    this.eventIdOutput.emit(this.editedAEventId);
  }
}
