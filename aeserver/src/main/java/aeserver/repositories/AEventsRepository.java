package aeserver.repositories;

import aeserver.models.AEvent;

import java.util.List;

public interface AEventsRepository {
  List<AEvent> findAll();
  AEvent findById(int id);
  AEvent save(AEvent event);
  void update(AEvent aEvent);
  AEvent remove(int id);
}
