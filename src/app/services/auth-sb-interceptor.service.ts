import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {SessionSbService} from "./session-sb.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthSbInterceptorService implements HttpInterceptor {

  constructor(private session: SessionSbService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Intercept"); //Log for confirmation

    let token = this.session.getTokenFromSessionStorage();

    if (token != null) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    console.log(req); //Log for confirmation

    return next.handle(req);
  }
}
