import {Component, Input, Output, OnInit, EventEmitter, OnChanges} from '@angular/core';
import {AEvent, aEventStatus} from "../../../models/a-event";
import {AEventsService} from "../../../services/a-events.service";

@Component({
  selector: 'app-detail4',
  templateUrl: './detail4.component.html',
  styleUrls: ['./detail4.component.css']
})
export class Detail4Component implements OnInit, OnChanges {

  @Input() editedAEventId: number = -1;
  @Output() removeOutput = new EventEmitter<number>();
  @Output() cancelOutput = new EventEmitter<number>();

  eventToEdit: AEvent = new AEvent();
  edited: boolean = false;

  selectValues = Object.values(aEventStatus);

  constructor(private aEventService: AEventsService) {
  }

  ngOnInit(): void {
  }

  public isEdited() {
    return this.edited;
  }

  /**
   * Compares if selected event equals the edited event.
   */
  onEdit() {
    if (this.editedAEventId !== -1)
      this.edited = this.eventToEdit.equals(<AEvent>this.aEventService.findById(this.editedAEventId));

  }

  onSaveEvent() {
    this.aEventService.save(this.eventToEdit);
  }

  onDeleteEvent() {
    if(!confirm("Do you want to delete the selected event?"))
      return;

    this.removeOutput.emit(this.editedAEventId);
  }

  onClearEvent() {
    if(!confirm("Do you want to clear the selected event?"))
      return;
    this.eventToEdit.clear();
  }

  onResetEvent() {
    if(!confirm("Do you want to reset the selected event?"))
      return;

    this.eventToEdit = Object.create(this.aEventService.findById(this.editedAEventId));
  }

  onCancelEvent() {
    if(!confirm("Do you want to deselect the event that you've currently selected?"))
      return;

    this.cancelOutput.emit(this.editedAEventId);
  }

  ngOnChanges(): void {
    this.eventToEdit = Object.create(this.aEventService.findById(this.editedAEventId));
    this.onEdit();
  }

}
