package aeserver.repositories;

import aeserver.models.AEvent;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
//@Primary
public class AEventsRepositoryMock implements AEventsRepository {

  private ArrayList<AEvent> aEventList = new ArrayList<>();

  public AEventsRepositoryMock() {
    for (int i = 0; i < 7; i++) {
      aEventList.add(AEvent.createRandomAEvent());
    }
  }

  @Override
  public List<AEvent> findAll() {
    return aEventList;
  }

  @Override
  public AEvent findById(int id) {
    for (AEvent aEvent : aEventList)
      if (aEvent.getID() == id)
        return aEvent;

    return null;
  }

  @Override
  public AEvent save(AEvent aEvent) {
    aEventList.add(aEvent);

    return aEvent;
  }

  @Override
  public void update(AEvent aEvent) {

    if (aEventList.contains(aEvent)) {
      aEventList.set(aEventList.indexOf(aEvent), aEvent);
    }
  }

  @Override
  public boolean remove(int id) {
    AEvent aEvent = findById(id);
    return aEventList.remove(aEvent);
  }
}
