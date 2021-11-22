import {Component, Input, Output, OnInit, EventEmitter, OnChanges, OnDestroy} from '@angular/core';
import {AEvent, aEventStatus} from "../../../models/a-event";
import {AEventsService} from "../../../services/a-events.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-detail4',
  templateUrl: './detail4.component.html',
  styleUrls: ['./detail4.component.css']
})
export class Detail4Component implements OnInit, OnChanges, OnDestroy {

  editedAEventId: number = -1;
  @Output() removeOutput = new EventEmitter<number>();
  @Output() cancelOutput = new EventEmitter<number>();

  private childParamsSubscription : Subscription | null = null;

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

  constructor(private aEventService: AEventsService, private route: ActivatedRoute) {
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
    console.log(this.editedAEventId)

    if (this.editedAEventId !== -1)
      this.edited = !this.eventToEdit.equals(<AEvent>this.aEventService.findById(this.editedAEventId));
  }

  onSaveEvent() {
    this.aEventService.save(this.eventToEdit);
    this.eventToEdit = Object.create(this.eventToEdit);
    this.edited = false;
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
    console.log("is called")
    this.eventToEdit = Object.create(this.aEventService.findById(this.editedAEventId));
    this.onEdit();
  }

  ngOnDestroy() {
    this.childParamsSubscription?.unsubscribe()
  }

}
