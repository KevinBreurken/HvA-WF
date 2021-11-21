package aeserver.repositories;

import aeserver.models.AEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Primary
public class AEventsRepositoryJpa implements AEventsRepository {

  @PersistenceContext
  EntityManager em;

  @Override
  public List<AEvent> findAll() {
    return null;
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
