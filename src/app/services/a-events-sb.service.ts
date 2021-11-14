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
    this.restGetAEvents().subscribe(data => {
      console.log(data)
    });
    this.http
      .get(
        'http://localhost:8084/aevent',
        {
          responseType: 'json'
        }
      );
  }

  private restGetAEvents() : Observable<AEvent[]> {
    return this.http
      .get(
        'http://localhost:8084/aevent',
        {
          responseType: 'json'
        }
      )
      .pipe(
        map(responseData => {
          const AEventsArray: AEvent[] = [];

          for (const key in responseData) {
            // @ts-ignore
            AEventsArray.push({ ...responseData[key]})
          }

          return AEventsArray;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  findAll(): AEvent[] {
    return this.aEventsList;
  }

  findById(id: number): AEvent | null {
    const foundEvent = this.aEventsList.find(x => x.id == id);
    return (foundEvent !== undefined) ? foundEvent : null;
  }

  save(aEvent: AEvent): AEvent | null {
    const foundEvent = this.findById(aEvent.id);

    if (foundEvent) {
      const position = this.aEventsList.indexOf(foundEvent);
      this.aEventsList[position] = aEvent;
    } else {
      this.aEventsList.push(aEvent);
    }

    return foundEvent;
  }

  deleteById(eId: number): AEvent | null {
    const eventToDelete = this.findById(eId);

    if (eventToDelete) {
      this.aEventsList.splice(
        this.aEventsList.indexOf(eventToDelete),
        1
      );
    }

    return eventToDelete;
  }

}
