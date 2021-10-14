package aeserver.restcontroller;

import aeserver.models.AEvent;
import aeserver.repositories.AEventsRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest")
public class AEventsController {

  private final AEventsRepository repository;

  public AEventsController(@Qualifier("Mock") AEventsRepository aEventsRepository){
    repository = aEventsRepository;
  }

  @GetMapping("/aevent")
  public List<AEvent> getAllAEvents() {
    return repository.findAll();
  }

}
