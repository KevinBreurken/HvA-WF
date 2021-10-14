package aeserver.repositories;

import aeserver.models.AEvent;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component("Mock")
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
}
