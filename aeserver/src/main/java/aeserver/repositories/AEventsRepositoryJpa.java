package aeserver.repositories;

import aeserver.models.AEvent;
import aeserver.models.Registration;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Primary
@Repository
public class AEventsRepositoryJpa implements AEventsRepository {

  EntityManager em;

  public AEventsRepositoryJpa(EntityManager em) {
    this.em = em;
  }

  @Override
  public List<AEvent> findAll() {
    return findByQuery("AEvent-get_all_events");
  }

  @Override
  public AEvent findById(long id) {
    return em.find(AEvent.class, id);
  }

  @Override
  public AEvent save(AEvent event) {
    return em.merge(event);
  }

  @Override
  public void update(AEvent aEvent) {
    if (findById(aEvent.getID()) == null) save(aEvent);
    else em.merge(aEvent);
  }

  @Override
  public boolean remove(long id) {
    AEvent foundEvent = em.find(AEvent.class, id);
    em.remove(foundEvent);
    return em.find(AEvent.class, id) == null;
  }

  @Override
  public List<AEvent> findByQuery(String jpqlName, Object... params) {
    TypedQuery<AEvent> query = em.createNamedQuery(jpqlName,AEvent.class);
    for (int i = 0; i < params.length; i++){
      query.setParameter(i+1,params[i]);
    }
    return query.getResultList();
  }

}
