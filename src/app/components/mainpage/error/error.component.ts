import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  private pathArray = window.location.href.split('#');
  private wrongPathName = ""

  constructor() {
  }

  ngOnInit(): void {
    this.wrongPathName = this.pathArray[this.pathArray.length-1];
  }

  public getWrongPathName() {
    return this.wrongPathName
  }

}
