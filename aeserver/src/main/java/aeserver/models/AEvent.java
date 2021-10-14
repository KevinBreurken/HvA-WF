package aeserver.models;

import java.util.Date;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

public class AEvent {

  private static int nextAvailableId = 20001;

  private String title;
  private int id;
  private Date start;
  private Date end;
  private String description;

  private boolean isTicketed =false;
  private double participationFee = 0;
  private double maxParticipants = 0;

  public AEvent(String title) {
    setTitle(title);
    setID(AEvent.nextAvailableId++);
  }

  public static AEvent createRandomAEvent(){
    int randomIndex = new Random().nextInt(7);
    String[] randTitle = new String[]{"Picnic at the park","Jogging around","Swimming at the beach","Cycling in the woods","Dancing in the streets","Canoe at the zoo","Skate and bake"};
    AEvent aEvent = new AEvent(randTitle[randomIndex]);
    aEvent.participationFee = Math.round((Math.random() * 100.0f) * 100.0) / 100.0;
    aEvent.maxParticipants = Math.round(Math.random() * 1000);

    aEvent.start = AEvent.dateBetween(new Date(System.currentTimeMillis()),new Date(System.currentTimeMillis() + 999999999));
    aEvent.end = AEvent.dateBetween(new Date(System.currentTimeMillis()),new Date(System.currentTimeMillis() + 999999999));
    return aEvent;
  }

  /**
   * from: https://www.baeldung.com/java-random-dates
   * @param startInclusive
   * @param endExclusive
   * @return
   */
  public static Date dateBetween(Date startInclusive, Date endExclusive) {
    long startMillis = startInclusive.getTime();
    long endMillis = endExclusive.getTime();
    long randomMillisSinceEpoch = ThreadLocalRandom
      .current()
      .nextLong(startMillis, endMillis);

    return new Date(randomMillisSinceEpoch);
  }


  public String getTitle() {
    return title;
  }

  public void setTitle(String message) {
    this.title = message;
  }

  public int getID() {
    return id;
  }

  public int setID(int id){
    return this.id = id;
  }

  public Date getStart() {
    return start;
  }

  public void setStart(Date start) {
    this.start = start;
  }

  public Date getEnd() {
    return end;
  }

  public void setEnd(Date end) {
    this.end = end;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public boolean isTicketed() {
    return isTicketed;
  }

  public void setTicketed(boolean ticketed) {
    isTicketed = ticketed;
  }

  public double getParticipationFee() {
    return participationFee;
  }

  public void setParticipationFee(double participationFee) {
    this.participationFee = participationFee;
  }

  public double getMaxParticipants() {
    return maxParticipants;
  }

  public void setMaxParticipants(double maxParticipants) {
    this.maxParticipants = maxParticipants;
  }

}
