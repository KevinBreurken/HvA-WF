import {Injectable} from '@angular/core';
import {AEvent, aEventStatus} from "../models/a-event";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AEventsSbService {

  private aEventsList: AEvent[] = [];

  constructor(private http: HttpClient) {
  }

  public restGetAEvents() {
    return this.http
      .get<AEvent[]>(
        'http://localhost:8084/aevent', {responseType: 'json'}
      )
      .pipe(
        map(responseData => {
          this.aEventsList = [];
          for (let i = 0; i < responseData.length; i++) {
            this.aEventsList.push(responseData[i])
          }
          return this.aEventsList;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  private restPostAEvent(aEvent: AEvent): Observable<AEvent> {
    return this.http.post<AEvent>('http://localhost:8084/aevent', aEvent);
  }

  private restPutAEvent(aEvent: AEvent): Observable<AEvent> {
    return this.http.put<AEvent>('http://localhost:8084/aevent', aEvent);
  }

  private restDeleteAEvent(aEventId: number): void {
    const url = `http://localhost:8084/aevent/${aEventId}`;
    this.http.delete(url, {responseType: 'json'}).subscribe(data => {
      if (data == false) return;

      for (let i = 0; i < this.aEventsList.length; i++) {
        if (this.aEventsList[i].id == aEventId) {
          this.aEventsList.splice(i, 1);
          break;
        }
      }
    }, catchError(errorRes => {
      return throwError(errorRes);
    }));
  }

  findAll(): AEvent[] {
    return this.aEventsList;
  }

  findById(id: number): AEvent | null {
    for (let i = 0; i < this.aEventsList.length; i++) {
      if (this.aEventsList[i].id == id)
        return AEvent.assignAEvent(this.aEventsList[i])
    }
    return null;
  }

  save(aEvent: AEvent): Observable<AEvent> {

    if (aEvent.id !== -1) {
      //Replaces element in the local list
      for (let i = 0; i < this.aEventsList.length; i++) {
        if (this.aEventsList[i].id == aEvent.id) {
          this.aEventsList.splice(i, 1, aEvent);
          break;
        }
      }

      return this.restPutAEvent(aEvent);
    } else {

      this.aEventsList.push(aEvent);
      return this.restPostAEvent(aEvent);
    }
  }

  deleteById(eId: number): AEvent | null {
    const eventToDelete = this.findById(eId);

    if (eventToDelete) {
      this.restDeleteAEvent(eId);
    }

    return eventToDelete;
  }

}
