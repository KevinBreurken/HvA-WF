package aeserver.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;
import java.util.Random;

@Entity
public class Registration implements Comparable<Registration> {

  @Id
  @GeneratedValue
  private long id;

  private String ticketCode;
  private boolean paid;

  @CreationTimestamp
  private LocalDateTime submissionDate;

  @ManyToOne
  @JsonBackReference
  private AEvent event;

  public Registration() {

  }

  public Registration(AEvent event){
    this.event = event;
    this.ticketCode = String.format("#%06x", new Random().nextInt(256 * 256 * 256));
  }

  public static Registration createRandomRegistration(AEvent linkedEvent) {
    Registration registration = new Registration();
    Random rand = new Random();
    registration.event = linkedEvent;
    registration.paid = rand.nextBoolean();
    registration.ticketCode = String.format("#%06x", rand.nextInt(256 * 256 * 256));
    return registration;
  }

  public AEvent getEvent() {
    return event;
  }

  public void setEvent(AEvent event) {
    this.event = event;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getTicketCode() {
    return ticketCode;
  }

  public void setTicketCode(String ticketCode) {
    this.ticketCode = ticketCode;
  }

  public boolean isPaid() {
    return paid;
  }

  public void setPaid(boolean paid) {
    this.paid = paid;
  }

  public LocalDateTime getSubmissionDate() {
    return submissionDate;
  }

  public void setSubmissionDate(LocalDateTime submissionDate) {
    this.submissionDate = submissionDate;
  }

  @Override
  public int compareTo(Registration o) {
    return 0;
  }
}
