package aeserver.restcontroller;

import aeserver.models.AEvent;
import aeserver.repositories.AEventsRepository;
import aeserver.repositories.AEventsRepositoryMock;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

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
    return repository.findById(id);
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

  @PutMapping("rest/aevent/{id}") //id:8
  public ResponseEntity<AEvent> updateOrReplaceEvent(@RequestBody AEvent aEvent) {
    repository.update(aEvent);

    URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
      .buildAndExpand(aEvent.getID()).toUri();


    return ResponseEntity.created(location).body(aEvent); //id:0
  }

  @DeleteMapping("rest/aevent/{id}")
  public ResponseEntity<AEvent> removeEvent(@PathVariable int id) {
    AEvent aEvent = repository.remove(id);

    return ResponseEntity.ok(aEvent);
  }

}
