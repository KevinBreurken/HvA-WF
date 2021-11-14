package aeserver.restcontroller;

import aeserver.exceptions.PreConditionFailedException;
import aeserver.exceptions.ResourceNotFoundException;
import aeserver.models.AEvent;
import aeserver.repositories.AEventsRepository;
import aeserver.repositories.AEventsRepositoryMock;
import com.fasterxml.jackson.annotation.JsonFilter;
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

  @GetMapping("aevent")
  public List<AEvent> getAllAEvents() {
    if (repository.findAll().size() == 0) throw new ResourceNotFoundException("No events to be found.");

    return repository.findAll();
  }

  @GetMapping("aevent/{id}")
  public AEvent getEvent(@PathVariable int id){
    if (repository.findById(id) == null) throw new ResourceNotFoundException("id-"+id);

    return repository.findById(id);
  }

  @PostMapping("aevent")
  public ResponseEntity<AEvent> setEvent(@RequestBody AEvent event) {
    if(event.getID() == 0)
      event.setID(AEvent.getNextAvailableId());

    AEvent savedEvent = repository.save(event);

    URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
      .buildAndExpand(savedEvent.getID()).toUri();

    return ResponseEntity.created(location).body(savedEvent);
  }

  @PutMapping("rest/aevent/{id}")
  public ResponseEntity<AEvent> updateOrReplaceEvent(@RequestBody AEvent aEvent, @PathVariable int id) {
    if (id != aEvent.getID()) throw new PreConditionFailedException("Id param is different to the id of the given event.");

    URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
      .buildAndExpand(aEvent.getID()).toUri();

    repository.update(aEvent);

    return ResponseEntity.ok(aEvent);
  }

  @DeleteMapping("rest/aevent/{id}")
  public ResponseEntity<AEvent> removeEvent(@PathVariable int id) {
    if (repository.findById(id) == null) throw new ResourceNotFoundException("id-"+id);

    AEvent aEvent = repository.remove(id);

    return ResponseEntity.ok(aEvent);
  }

}
