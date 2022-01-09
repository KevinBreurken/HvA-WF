package aeserver.models;

import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@Entity
@NamedQueries({
  @NamedQuery(name = "AEvent-get_all_events", query = "Select a From AEvent a"),
  @NamedQuery(name = "AEvent_find_by_title", query = "Select a From AEvent a where a.title = ?1"),
  @NamedQuery(name = "AEvent_find_by_status", query = "Select a From AEvent a where a.status = ?1"),
  @NamedQuery(name = "AEvent_find_by_minRegistrations", query = "Select a From AEvent a where a.registrations.size >= ?1")
})
public class AEvent implements Comparable<AEvent> {
  private static int nextAvailableId = 20001;
  private static String[] allowedStatusses = {"DRAFT", "PUBLISHED", "CANCELED"};
  @Id
  @GeneratedValue
  private long id;
  private String title;
  private Date start;
  private Date end;
  private String description = "";
  private String status;

  private boolean ticketed;
  private double participationFee = 0;
  private double maxParticipants = 0;

  @OneToMany(mappedBy = "event", orphanRemoval = true)
  @Cascade({org.hibernate.annotations.CascadeType.PERSIST, org.hibernate.annotations.CascadeType.REMOVE})
  private List<Registration> registrations = new ArrayList<>();

  public AEvent() {
  }

  public AEvent(String title, String description) {
    setTitle(title);
    setDescription(description);

    setID(AEvent.nextAvailableId++);
  }

  public AEvent(String title, Date start, Date end, String description, boolean ticketed, double participationFee, double maxParticipants, String status) {
    this.title = title;
    this.start = start;
    this.end = end;
    this.description = description;
    this.participationFee = participationFee;
    this.maxParticipants = maxParticipants;
    this.ticketed = ticketed;
    this.status = status;
  }

  public static int getNextAvailableId() {
    return ++nextAvailableId;
  }

  public static AEvent createRandomAEvent() {
    int randomIndex = new Random().nextInt(7);
    String[] randTitle = new String[]{"Picnic at the park", "Jogging around", "Swimming at the beach", "Cycling in the woods", "Dancing in the streets", "Canoe at the zoo", "Skate and bake"};
    AEvent aEvent = new AEvent();
    aEvent.id = getNextAvailableId();
    aEvent.title = randTitle[randomIndex];
    aEvent.participationFee = Math.round((Math.random() * 100.0f) * 100.0) / 100.0;
    aEvent.maxParticipants = Math.round(Math.random() * 1000);

    aEvent.start = AEvent.dateBetween(new Date(System.currentTimeMillis()), new Date(System.currentTimeMillis() + 999999999));
    aEvent.end = AEvent.dateBetween(new Date(System.currentTimeMillis()), new Date(System.currentTimeMillis() + 999999999));
    aEvent.status = "DRAFT";
    return aEvent;
  }

  /**
   * from: https://www.baeldung.com/java-random-dates
   *
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

  public static boolean isStatusValid(String status) {
    for (String allowedStatus : allowedStatusses) {
      if (allowedStatus.equals(status))
        return true;
    }
    return false;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String message) {
    this.title = message;
  }

  public long getID() {
    return id;
  }

  public long setID(int id) {
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

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public Boolean getTicketed() {
    return ticketed;
  }

  public void setTicketed(Boolean ticketed) {
    this.ticketed = ticketed;
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

  public List<Registration> getRegistrations() {
    return registrations;
  }

  public void addRegistration(Registration registrations) {
    this.registrations.add(registrations);
  }

  public void removeRegistration(Registration registrations) {
    this.registrations.remove(registrations);
  }

  @Override
  public int compareTo(AEvent o) {
    return (int) (id - o.getID());
  }

  @Override
  public boolean equals(Object o) {
    return id == ((AEvent) o).getID();
  }

  @Override
  public int hashCode() {
    return Objects.hash(title, id, start, end, description, ticketed, participationFee, maxParticipants, status);
  }
}

