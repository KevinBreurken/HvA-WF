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
    console.log("Intercepting")

    let token = this.session.getTokenFromSessionStorage();

    if (token != null) {
      console.log("Cloning")
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req);
  }
}
