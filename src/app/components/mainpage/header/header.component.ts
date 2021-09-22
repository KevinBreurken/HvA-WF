import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = "Amsterdam Events";
  subtitleLogo = "Made at";
  public isCollapsed = true;

  constructor() {

  }

  ngOnInit(): void {
  }

  getCurrentDate() :string{
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    // @ts-ignore
    return new Date(Date.now()).toLocaleString('en-EN',options);
  }
}
