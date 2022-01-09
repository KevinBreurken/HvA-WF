import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {User} from "../models/user";
import {share, shareReplay} from "rxjs/operators";
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class SessionSbService {
  public readonly BACKEND_AUTH_URL = "http://localhost:8084/authenticate";

  public currentUser: User | null = null;

  // utility function to decode token
  jwtService = new JwtHelperService();

  constructor(private http: HttpClient) {
    this.getTokenFromSessionStorage();
    this.updateUserInformation();
  }

  public signOn(email: string, password: string) {
    console.log("login " + email + "/" + password);

    let observable = this.http.post<HttpResponse<User>>(this.BACKEND_AUTH_URL + "/login", {
        eMail: email,
        passWord: password
      },
      {observe: "response"}).pipe(share());

    observable.subscribe(response => {

      let token = response["headers"].get("Authorization");

      if(token == null)
        throw new Error("token was not present in the response");

      token = token.replace("Bearer", "");

      sessionStorage.setItem("token",token);
      sessionStorage.setItem("username", email.split("@")[0]);

      this.updateUserInformation();
    }, error => {
      this.signOff();
    })
    return observable;
  }

  public signOff() {
    sessionStorage.removeItem("token");
  }

  public isAuthenticated(): boolean {
    return this.getTokenFromSessionStorage() != null;
  }

  public getTokenFromSessionStorage(): string | null {
    return sessionStorage.getItem("token");
  }

  private updateUserInformation(): void {

    const currentToken = this.getTokenFromSessionStorage();
    if (currentToken) {

      const decodedToken = this.jwtService.decodeToken(currentToken);

      this.currentUser = new User();
      this.currentUser.name = decodedToken.name;
      this.currentUser.email = decodedToken.email;

    } else {
      this.currentUser = null;
    }
  }

}
