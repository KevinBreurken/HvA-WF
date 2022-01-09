package aeserver.repositories;

import aeserver.models.ExternalEvent;
import aeserver.models.User;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Primary
@Repository
public class UserRepositoryJPA implements BaseRepository<User> {

  EntityManager em;

  public UserRepositoryJPA(EntityManager em) {
    this.em = em;
  }

  @Override
  public List<User> findAll() {
    return em.createQuery("SELECT u FROM User u", User.class).getResultList();
  }

  @Override
  public User findById(long id) {
    return em.find(User.class, id);
  }

  @Override
  public User save(User element) {
    return em.merge(element);
  }

  @Override
  public void update(User element) {
    em.merge(element);
  }

  @Override
  public boolean remove(long id) {
    User user = findById(id);
    em.remove(user);
    return findById(id) == null;
  }

  @Override
  public List<User> findByQuery(String jpqlName, Object... params) {
    return null;
  }

  public ExternalEvent findExternalEvent(Long eventId) {
    return em.find(ExternalEvent.class, eventId);
  }
}
