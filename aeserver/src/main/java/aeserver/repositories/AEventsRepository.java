package aeserver.repositories;

import aeserver.models.AEvent;

import java.util.List;

public interface AEventsRepository {
  List<AEvent> findAll();
  AEvent findByID(int id);
  AEvent save(AEvent event);
}
