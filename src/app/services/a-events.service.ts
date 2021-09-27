import {Injectable} from '@angular/core';
import {AEvent} from "../models/a-event";

@Injectable({
  providedIn: 'root'
})
export class AEventsService {
  
  public aEventsList: AEvent[];

  constructor() {
    this.aEventsList = [];
    for (let i = 0; i < 9; i++) {
      this.aEventsList.push(AEvent.createRandomAEvent());
    }
  }

  findAll(): AEvent[] {
    return this.aEventsList;
  }

  findById(id: number): AEvent | null {
    const foundEvent = this.aEventsList.find(x => x.id === id);
    return (foundEvent !== undefined) ? foundEvent : null;
  }

  save(aEvent: AEvent): AEvent | null {
    const foundEvent = this.findById(aEvent.id);
    if (foundEvent) this.deleteById(aEvent.id);

    this.aEventsList.push(aEvent);

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
