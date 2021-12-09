package aeserver.repositories;

import aeserver.models.Registration;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Primary
@Repository
public class RegistrationsRepositoryJPA implements BaseRepository<Registration> {

  EntityManager em;
  public RegistrationsRepositoryJPA(EntityManager em) {
    this.em = em;
  }

  @Override
  public List<Registration> findAll() {
    return (List<Registration>) em.createQuery("SELECT e FROM AEvent e").getResultList();
  }

  @Override
  public Registration findById(long id) {
    return em.find(Registration.class, id);
  }

  @Override
  public Registration save(Registration element) {
    return em.merge(element);
  }

  @Override
  public void update(Registration element) {
    if (findById(element.getId()) == null) save(element);
    else em.merge(element);
  }

  @Override
  public boolean remove(long id) {
    Registration foundEvent = em.find(Registration.class, id);
    em.remove(foundEvent);
    return em.find(Registration.class, id) == null;
  }

  @Override
  public List<Registration> findByQuery(String jpqlName, Object... params) {

    TypedQuery<Registration> query = em.createNamedQuery(jpqlName,Registration.class);
    for (int i = 0; i < params.length; i++){
      query.setParameter(i,params[i]);
    }
    return query.getResultList();
  }
}
