import {Component, OnInit} from '@angular/core';
import {SessionSbService} from "../../services/session-sb.service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-sign-on',
  templateUrl: './sign-on.component.html',
  styleUrls: ['./sign-on.component.css']
})
export class SignOnComponent implements OnInit {

  // @ts-ignore
  loginForm: FormGroup;
  private formBuilder: FormBuilder | undefined;

  constructor(private session: SessionSbService, private router: Router) {
    // @ts-ignore
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

    // stop here if form is invalid
    if (this.loginForm?.invalid) {
      return;
    }

    console.log(this.loginForm?.get('email')?.value)
    console.log(this.loginForm?.get('password')?.value)
    this.session.signOn(this.loginForm?.get('email')?.value, this.loginForm?.get('password')?.value).subscribe(data => {
      this.router.navigate(["/"])
    });
  }
}
