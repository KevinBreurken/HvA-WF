package aeserver.restcontroller;

import aeserver.models.AEvent;
import aeserver.repositories.AEventsRepository;
import aeserver.repositories.AEventsRepositoryMock;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.annotation.Resource;
import java.net.URI;
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

  @GetMapping("rest/aevent/{id}")
  public AEvent getEvent(@PathVariable int id){
    return repository.findByID(id);
  }

  @PostMapping("/rest/aevent")
  public ResponseEntity<AEvent> setEvent(@RequestBody AEvent event) {
    if(event.getID() == 0)
      event.setID(AEvent.getNextAvailableId());
    
    AEvent savedEvent = repository.save(event);

    URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
      .buildAndExpand(savedEvent.getID()).toUri();

    return ResponseEntity.created(location).body(savedEvent);
  }

}
