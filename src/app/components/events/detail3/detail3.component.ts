import {Component, Input, Output, OnInit, EventEmitter, Inject} from '@angular/core';
import {AEvent, aEventStatus} from "../../../models/a-event";

@Component({
  selector: 'app-detail3',
  templateUrl: './detail3.component.html',
  styleUrls: ['./detail3.component.css']
})
export class Detail3Component implements OnInit {

  @Input() event : AEvent | undefined;
  @Output() eventOutput = new EventEmitter<AEvent>();

  selectValues = Object.values(aEventStatus)

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteEvent(){
    this.eventOutput.emit(this.event);
  }
}
