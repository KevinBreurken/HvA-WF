package aeserver.restcontroller;

import aeserver.exceptions.ResourceNotFoundException;
import aeserver.models.AEvent;
import aeserver.repositories.AEventsRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
public class AEventsController {

  private final AEventsRepository repository;

  public AEventsController(AEventsRepository aEventsRepository){
    repository = aEventsRepository;
  }

  @GetMapping("aevent")
  public List<AEvent> getAllAEvents() {
    List<AEvent> aEvents = repository.findAll();
    if (aEvents.size() == 0) throw new ResourceNotFoundException("No events to be found.");
    return aEvents;
  }

  @GetMapping("aevent/{id}")
  public AEvent getEvent(@PathVariable int id){
    if (repository.findById(id) == null) throw new ResourceNotFoundException("id-"+id);

    return repository.findById(id);
  }

  @PostMapping("aevent")
  public ResponseEntity<AEvent> setEvent(@RequestBody AEvent event) {
    System.out.println("ASd");
    AEvent savedEvent = repository.save(event);

    URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
      .buildAndExpand(savedEvent.getID()).toUri();

    return ResponseEntity.created(location).body(savedEvent);
  }

  @PutMapping("aevent")
  public ResponseEntity<AEvent> updateOrReplaceEvent(@RequestBody AEvent aEvent) {
    System.out.println("Called Put Event");

    System.out.println(aEvent.getTitle());
    System.out.println(aEvent.getID());
    System.out.println(aEvent.getTicketed());
    System.out.println(aEvent.getStatus());
    repository.update(aEvent);

    return ResponseEntity.ok(aEvent);
  }

  @DeleteMapping("aevent/{id}")
  public ResponseEntity<Boolean> removeEvent(@PathVariable int id) {
    if (repository.findById(id) == null) throw new ResourceNotFoundException("id-"+id);

    boolean isRemoved = repository.remove(id);

    return ResponseEntity.ok(isRemoved);
  }

}
