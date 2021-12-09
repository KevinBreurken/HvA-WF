package aeserver.repositories;

import java.util.List;

public interface BaseRepository<T> {
  List<T> findAll();
  T findById(long id);
  T save(T element);
  void update(T element);
  boolean remove(long id);

  List<T> findByQuery(String jpqlName, Object... params);

}
