// import {start} from "repl";

export enum aEventStatus {
  DRAFT ,
  PUBLISHED ,
  CANCELED
}

export class AEvent {
  static nextAvailableId = 20001;

  id: number;
  title: String = "";
  start: Date = new Date();
  end: Date = new Date();
  description: String = "";
  status: aEventStatus = aEventStatus.DRAFT;
  //optional
  isTicketed: Boolean = false;
  participationFee: number = 0;
  maxParticipants: number = 0;

  constructor() {
    this.id = AEvent.nextAvailableId++;
  }

  public static createRandomAEvent(): AEvent {
    let newEvent = new AEvent();

    //Title
    const arrTitle: string[] = ["Swimming","Drinking","Eating","Dancing","Cooking"];
    newEvent.title = "Test Title";
    //Start
    newEvent.start = new Date(+(new Date()) - Math.floor(Math.random() * 10000000000));
    //End
    newEvent.end = new Date(+(new Date()) - Math.floor(Math.random() * 10000000000));

    //Description
    newEvent.description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos eveniet ipsam iste iure labore laudantium maxime neque pariatur perferendis, ut?";

    newEvent.status = Math.floor(Math.random() * 3); //Event status

    newEvent.isTicketed = Math.random() >= 0.5;
    if (newEvent.isTicketed) {
      newEvent.participationFee = Math.floor(Math.random() * 200);
      newEvent.maxParticipants = Math.floor(Math.random() * 1800);
    }

    return newEvent;
  }
}
