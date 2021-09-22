import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import {AEvent} from "../../../models/a-event";

@Component({
  selector: 'app-detail2',
  templateUrl: './detail2.component.html',
  styleUrls: ['./detail2.component.css']
})
export class Detail2Component implements OnInit {

  @Input() event : AEvent | undefined;
  @Output() eventOutput = new EventEmitter<AEvent>();

  // @Input() AEventStatusEnum : AEventStatus | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteEvent(){
    this.eventOutput.emit(this.event);
  }
}
