export enum aEventStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  CANCELED = "CANCELED"
}

export class AEvent {
  static nextAvailableId = 20001;

  id: number;
  title: String = "new Event";
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

    newEvent.status = <aEventStatus>Object.keys(aEventStatus)[Math.floor(Math.random() * 3)];

    newEvent.isTicketed = Math.random() >= 0.5;
    if (newEvent.isTicketed) {
      newEvent.participationFee = Math.floor(Math.random() * 200);
      newEvent.maxParticipants = Math.floor(Math.random() * 1800);
    }

    return newEvent;
  }
}
