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
  @Output() removeOutput = new EventEmitter<number>();
  @Output() cancelOutput = new EventEmitter<number>();

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
    this.removeOutput.emit(this.editedAEventId);
  }

  onClearEvent() {
    this.eventToEdit.clear();
  }

  onResetEvent() {
    this.eventToEdit = Object.create(this.aEventService.findById(this.editedAEventId));
  }

  onCancelEvent() {
    this.cancelOutput.emit(this.editedAEventId);
  }

  ngOnChanges(): void {
    this.onResetEvent();
  }
}
