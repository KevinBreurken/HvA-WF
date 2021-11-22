import {Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {AEvent, aEventStatus} from "../../../models/a-event";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";
import {AEventsSbService} from "../../../services/a-events-sb.service";

@Component({
  selector: 'app-detail5',
  templateUrl: './detail5.component.html',
  styleUrls: ['./detail5.component.css']
})
export class Detail5Component implements OnInit, OnChanges, OnDestroy {

  editedAEventId: number = -1;
  @Output() removeOutput = new EventEmitter<number>();
  @Output() cancelOutput = new EventEmitter<number>();

  private childParamsSubscription : Subscription | null = null;

  eventToEdit: AEvent = new AEvent(-1," ", new Date(), new Date(), " ", aEventStatus.PUBLISHED, false, 0, 0);
  // eventToEdit : AEvent | null | undefined;
  edited: boolean = false;

  selectValues = Object.values(aEventStatus);

  constructor(private aEventService: AEventsSbService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.childParamsSubscription =
    this.route.params
      .subscribe(
        (params: Params) => {
          if (params['eventId'] != undefined) {
            this.editedAEventId = params['eventId']
            this.ngOnChanges()
          }
        }
      );
  }

  public isEdited() {
    return this.edited;
  }

  /**
   * Compares if selected event equals the edited event.
   */
  onEdit() {
    if (this.editedAEventId !== -1 && this.eventToEdit?.id !== undefined) {
      let old = this.aEventService.findById(this.editedAEventId);
      if (old != null) {
        console.log(this.eventToEdit.equals(AEvent.assignPost(old)))
        this.edited = !this.eventToEdit.equals(AEvent.assignPost(old));
      }
    }
  }

  onSaveEvent() {
    if (this.eventToEdit != null) {
      this.aEventService.save(this.eventToEdit);
      this.eventToEdit = Object.create(this.eventToEdit);
      this.edited = false;
    }
  }

  onDeleteEvent() {
    if(!confirm("Do you want to delete the selected event?"))
      return;

    this.removeOutput.emit(this.editedAEventId);
    this.editedAEventId = -1;
  }

  onClearEvent() {
    if(!confirm("Do you want to clear the selected event?"))
      return;
    this.eventToEdit?.clear();
    this.edited = true;
  }

  onResetEvent() {
    if(!confirm("Do you want to reset the selected event?"))
      return;

    this.eventToEdit = Object.create(this.aEventService.findById(this.editedAEventId));
    this.edited = false;
  }

  onCancelEvent() {
    if(!confirm("Do you want to deselect the event that you've currently selected?"))
      return;

    this.cancelOutput.emit(this.editedAEventId);
    this.editedAEventId = -1;
  }

  ngOnChanges(): void {
    this.eventToEdit = Object.create(this.aEventService.findById(this.editedAEventId));
    this.onEdit();
  }

  ngOnDestroy() {
    this.childParamsSubscription?.unsubscribe()
  }

}
