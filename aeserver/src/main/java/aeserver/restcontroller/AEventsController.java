package aeserver.restcontroller;

import aeserver.models.AEvent;
import aeserver.repositories.AEventsRepository;
import aeserver.repositories.AEventsRepositoryMock;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
public class AEventsController {

  private final AEventsRepository repository;

  public AEventsController(){
    repository = new AEventsRepositoryMock();
  }

  @GetMapping("rest/aevent")
  public List<AEvent> getAllAEvents() {
    return repository.findAll();
  }

}
