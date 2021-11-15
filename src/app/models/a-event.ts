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

  public clear() {
    this.title = "";
    this.description = "";

    this.status = aEventStatus.DRAFT;

    this.start = new Date(Date.now());
    this.end = new Date(Date.now());

    this.isTicketed = false;
    this.participationFee = 0;
    this.maxParticipants = 0;
  }

  public equals(other: AEvent) {

    if (this.title !== other.title)
      return false;

    if (this.description !== other.description)
      return false;

    if (this.status !== other.status)
      return false;

    if (this.isTicketed !== other.isTicketed)
      return false;

    if (this.participationFee !== other.participationFee)
      return false;

    return this.maxParticipants === other.maxParticipants;

  }

  static trueCopy(aEvent: AEvent): AEvent {
    return <AEvent>(aEvent == null ? null : Object.assign(new AEvent(), aEvent));
  }
}
