import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {User} from "../models/user";
import {shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SessionSbService {
  public readonly BACKEND_AUTH_URL = "http://localhost:8084/authenticate";

  public currentUserName: string = "";

  constructor(private http: HttpClient) {
    this.getTokenFromSessionStorage();
  }

  public signOn(email: string, password: string) {
    console.log("login " + email + "/" + password);
    let signInResponse = this.http.post<HttpResponse<User>>(this.BACKEND_AUTH_URL + "/login", {
        email: email,
        passWord: password
      },
      {observe: "response"}).pipe(shareReplay(1));
    signInResponse.subscribe(response => {
      console.log(response);
      this.saveTokenIntoSessionStorage(
        response.headers.get("Authorization"),
        (response.body as unknown as User).name
      );
    }, error => {
      console.log(error);
      this.saveTokenIntoSessionStorage("","");
    })
    return signInResponse;
  }

  public signOff() {

  }

  public isAuthenticated(): boolean {
    return true;
  }

  public getTokenFromSessionStorage(): string | null {
    return "";
  }

  public saveTokenIntoSessionStorage(token: string | null, username: string| null) {

  }
}
