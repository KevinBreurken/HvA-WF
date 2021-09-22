import { Component, Input, OnInit } from '@angular/core';
import {AEvent} from "../../../models/a-event";
// import {AEventStatus} from "../../../models/a-event-status";


@Component({
  selector: 'app-detail2',
  templateUrl: './detail2.component.html',
  styleUrls: ['./detail2.component.css']
})
export class Detail2Component implements OnInit {

  @Input() event : AEvent | undefined;

  // @Input() AEventStatusEnum : AEventStatus | undefined;

  constructor() { }

  ngOnInit(): void {
  }
}
