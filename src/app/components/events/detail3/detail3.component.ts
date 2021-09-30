import {Component, Input, Output, OnInit, EventEmitter, OnChanges} from '@angular/core';
import {AEvent, aEventStatus} from "../../../models/a-event";
import {AEventsService} from "../../../services/a-events.service";

@Component({
  selector: 'app-detail3',
  templateUrl: './detail3.component.html',
  styleUrls: ['./detail3.component.css']
})
export class Detail3Component implements OnInit, OnChanges {

  @Input() editedAEventId: number = -1;
  @Output() eventIdOutput = new EventEmitter<number>();

  eventToEdit: AEvent = new AEvent();

  selectValues = Object.values(aEventStatus);

  constructor(private aEventService: AEventsService) {
  }

  ngOnInit(): void {
  }

  onSaveEvent() {
    this.aEventService.save(this.eventToEdit);
  }

  onDeleteEvent() {
    this.eventIdOutput.emit(this.editedAEventId);
  }

  onClearEvent() {
    // console.log(this.eventToEdit)
    // console.log(this.eventToEdit.id)
    this.eventToEdit.clear();

  }

  onResetEvent() {
    this.eventToEdit = <AEvent>JSON.parse(JSON.stringify(this.aEventService.findById(this.editedAEventId)));
    // console.log(this.eventToEdit)
  }

  onCancelEvent() {

  }

  ngOnChanges(): void {
    this.onResetEvent();
  }
}
