package aeserver.models;

import javax.persistence.Entity;
import java.util.Date;

@Entity
public class ExternalEvent extends AEvent {
  public boolean visible;

  private long userId;

  public ExternalEvent() {
  }

  public ExternalEvent(String title, Date start, Date end, String description, boolean ticketed,
                       double participationFee, double maxParticipants, String status, boolean visible, long userId) {
    super(title, start, end, description, ticketed, participationFee, maxParticipants, status);
    this.visible = visible;
    this.userId = userId;
  }

  public boolean isVisible() {
    return visible;
  }

  public void setVisible(boolean visible) {
    this.visible = visible;
  }

    public long getUserId() {
    return userId;
  }

  public void setUserId(long userId) {
    this.userId = userId;
  }
}
