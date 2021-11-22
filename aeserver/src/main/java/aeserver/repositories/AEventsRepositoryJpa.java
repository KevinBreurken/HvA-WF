package aeserver.repositories;

import aeserver.models.AEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

@Repository
//@Primary
public class AEventsRepositoryJpa implements AEventsRepository {

  private ArrayList<AEvent> aEventList = new ArrayList<>();

  @PersistenceContext
  EntityManager em;

  @Override
  public List<AEvent> findAll() {
    for (int i = 0; i < 20; i++) {
      aEventList.add(AEvent.createRandomAEvent());
    }
    return aEventList;
  }

  @Override
  public AEvent findById(int id) {
    return em.find(AEvent.class, id);
  }

  @Override
  public AEvent save(AEvent event) {
    return null;
  }

  @Override
  public void update(AEvent aEvent) {

  }

  @Override
  public AEvent remove(int id) {
    return null;
  }
}
