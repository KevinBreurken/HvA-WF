import {Component, OnInit} from '@angular/core';
import {SessionSbService} from "../../../services/session-sb.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header-sb',
  templateUrl: './header-sb.component.html',
  styleUrls: ['./header-sb.component.css']
})
export class HeaderSbComponent implements OnInit {

  title = "Amsterdam Events";
  subtitleLogo = "Made at";
  public isCollapsed = true;

  constructor(public session: SessionSbService,private router: Router) {

  }

  ngOnInit(): void {
  }

  getCurrentDate(): string {
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    // @ts-ignore
    return new Date(Date.now()).toLocaleString('en-EN', options);
  }

  onLogoutClicked() {
    this.session.signOff();
    this.router.navigate(["/"])
  }
}
