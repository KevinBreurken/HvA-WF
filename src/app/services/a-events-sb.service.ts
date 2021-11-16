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
      for (let i = 0; i < data.length; i++) {
        this.aEventsList.push(AEvent.trueCopy(data[i]));
      }
    })
  }

  private restGetAEvents(): Observable<AEvent[]> {
    return this.http
      .get(
        'http://localhost:8084/aevent', {responseType: 'json'}
      )
      .pipe(
        map(responseData => {
          const AEventsArray: AEvent[] = [];
          for (const key in responseData) {
            // @ts-ignore
            AEventsArray.push({...responseData[key]});
          }
          return AEventsArray;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  private restPostAEvent(aEvent: AEvent): Observable<AEvent> {
    // @ts-ignore
    return this.http.post('http://localhost:8084/aevent', aEvent).subscribe(data => {
      return data;
    },catchError(errorRes => {
      return throwError(errorRes);
    }));
  }

  private restPutAEvent(aEvent: AEvent): Observable<AEvent> {
    const url = `http://localhost:8084/aevent/${aEvent.id}`;
    // @ts-ignore
    return this.http.put(url, aEvent).subscribe(data => {
      return data;
    },catchError(errorRes => {
      return throwError(errorRes);
    }));
  }

  private restDeleteAEvent(aEventId: number): void {
    const url = `http://localhost:8084/aevent/${aEventId}`;
    this.http.delete(url, {responseType: 'json'}).subscribe(data => {
      console.log("Deleted");
    },catchError(errorRes => {
      return throwError(errorRes);
    }));
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
      //TODO: This wont work for some reason.

      // this.restPutAEvent(aEvent).subscribe(data => {
      //   const position = this.aEventsList.indexOf(foundEvent);
      //   this.aEventsList[position] = aEvent;
      // });

      //Send to backend
      let copy = AEvent.trueCopy(aEvent);
      this.restPutAEvent(copy);
      //Update frontend
      const position = this.aEventsList.indexOf(foundEvent);
      this.aEventsList[position] = aEvent;
    } else {
      //TODO: same here

      // this.restPostAEvent(aEvent).subscribe(data => {
      //   this.aEventsList.push(aEvent);
      // });

      this.restPostAEvent(aEvent);
      this.aEventsList.push(aEvent);

    }

    return foundEvent;
  }

  deleteById(eId: number): AEvent | null {
    const eventToDelete = this.findById(eId);

    if (eventToDelete) {
      this.restDeleteAEvent(eId);
      this.aEventsList.splice(
        this.aEventsList.indexOf(eventToDelete),
        1
      );
    }

    return eventToDelete;
  }

}
