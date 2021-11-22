export enum aEventStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  CANCELED = "CANCELED"
}

export class AEvent {

  id: number = -1;
  title: String = "new Event";
  start: Date = new Date();
  end: Date = new Date();
  description: String = "";
  status: aEventStatus = aEventStatus.DRAFT;
  //optional
  isTicketed: Boolean = false;
  participationFee: number = 0;
  maxParticipants: number = 0;

  // constructor() {
  // }


  constructor(id: number, title: String, start: Date, end: Date, description: String, status: aEventStatus, isTicketed: Boolean, participationFee: number, maxParticipants: number) {
    this.id = id;
    this.title = title;
    this.start = start;
    this.end = end;
    this.description = description;
    this.status = status;
    this.isTicketed = isTicketed;
    this.participationFee = participationFee;
    this.maxParticipants = maxParticipants;
  }

  public static createRandomAEvent(): AEvent {
    let newEvent = new AEvent(
      -1, "Test Title",
      new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
      new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos eveniet ipsam iste iure labore laudantium maxime neque pariatur perferendis, ut?",
      <aEventStatus>Object.keys(aEventStatus)[Math.floor(Math.random() * 3)],
      false, 0, 0
    );
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
    return <AEvent>(aEvent == null ? null : Object.assign(new AEvent(
      -1, "Test Title",
      new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
      new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos eveniet ipsam iste iure labore laudantium maxime neque pariatur perferendis, ut?",
      <aEventStatus>Object.keys(aEventStatus)[Math.floor(Math.random() * 3)],
      false, 0, 0
    ), aEvent));
  }

  public static assignPost(aAevent : AEvent) {
    return Object.assign(
      new AEvent(
        aAevent.id, aAevent.title, aAevent.start, aAevent.end, aAevent.description,
        aAevent.status, aAevent.isTicketed, aAevent.participationFee, aAevent.maxParticipants
      )
    );
  }
}
