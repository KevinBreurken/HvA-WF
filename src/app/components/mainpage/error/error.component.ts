import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {

  private pathArray = window.location.href.split('#');
  private wrongPathName = "";

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      this.pathArray = window.location.href.split('#');
      this.wrongPathName = this.pathArray[this.pathArray.length-1];
    });
  }


  public getWrongPathName() {
    return this.wrongPathName;
  }

}
