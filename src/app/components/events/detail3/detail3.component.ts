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

  eventToEdit: AEvent = new AEvent(
    -1, "Test Title",
    new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
    new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos eveniet ipsam iste iure labore laudantium maxime neque pariatur perferendis, ut?",
    <aEventStatus>Object.keys(aEventStatus)[Math.floor(Math.random() * 3)],
    false, 0, 0
  );
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
    this.eventToEdit = Object.create(this.eventToEdit);
  }

  onDeleteEvent() {
    if (!confirm("Do you want to delete the selected event?"))
      return;

    this.removeOutput.emit(this.editedAEventId);
  }

  onClearEvent() {
    if (!confirm("Do you want to clear the selected event?"))
      return;
    this.eventToEdit.clear();
  }

  onResetEvent() {
    if (!confirm("Do you want to reset the selected event?"))
      return;

    this.eventToEdit = Object.create(this.aEventService.findById(this.editedAEventId));
  }

  onCancelEvent() {
    if (!confirm("Do you want to deselect the event that you've currently selected?"))
      return;

    this.cancelOutput.emit(this.editedAEventId);
  }

  ngOnChanges(): void {
    this.eventToEdit = Object.create(this.aEventService.findById(this.editedAEventId));
    this.onEdit();
  }

}
