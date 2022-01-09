package aeserver.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class ExternalEvent extends AEvent {
  public boolean visible;

  @ManyToOne
  @JsonBackReference
  private User organiser;

  public ExternalEvent() {
  }

  public boolean isVisible() {
    return visible;
  }

  public void setVisible(boolean visible) {
    this.visible = visible;
  }

  public User getOrganiser() {
    return organiser;
  }

  public void setOrganiser(User organiser) {
    this.organiser = organiser;
  }
}
