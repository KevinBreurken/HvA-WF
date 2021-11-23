package aeserver.repositories;

import aeserver.models.AEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Primary
@Repository
public class AEventsRepositoryJpa implements AEventsRepository {

  private ArrayList<AEvent> aEventList = new ArrayList<>();

  public AEventsRepositoryJpa(EntityManager em) {
    this.em = em;
  }

  //  @Autowired
//  @PersistenceContext
  EntityManager em;

  @Override
  public List<AEvent> findAll() {
//    for (int i = 0; i < 20; i++) {
//      aEventList.add(AEvent.createRandomAEvent());
//    }
//    return aEventList;
    return (List<AEvent>) em.createQuery("SELECT e FROM AEvent e").getResultList();
  }

  @Override
  public AEvent findById(int id) {
    return em.find(AEvent.class, id);
  }

  @Override
  public AEvent save(AEvent event) {
    return em.merge(event);
  }

  @Override
  public void update(AEvent aEvent) {

  }

  @Override
  public AEvent remove(int id) {
    return null;
  }
}
