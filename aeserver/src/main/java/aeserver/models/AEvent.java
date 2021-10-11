package aeserver.models;

import java.util.Date;

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
