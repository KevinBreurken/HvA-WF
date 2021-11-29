package aeserver.restcontroller;

import aeserver.exceptions.ResourceNotFoundException;
import aeserver.models.AEvent;
import aeserver.models.Registration;
import aeserver.repositories.AEventsRepository;
import aeserver.repositories.RegistrationsRepositoryJPA;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
public class AEventsController {

  private final AEventsRepository repository;
  private final RegistrationsRepositoryJPA registrationsRepositoryJPA;

  public AEventsController(AEventsRepository aEventsRepository, RegistrationsRepositoryJPA registrationsRepositoryJPA){
    repository = aEventsRepository;
    this.registrationsRepositoryJPA = registrationsRepositoryJPA;
  }

  @GetMapping("aevent")
  public List<AEvent> getAllAEvents() {
    List<AEvent> aEvents = repository.findAll();
    if (aEvents.size() == 0) throw new ResourceNotFoundException("No events to be found.");
    return aEvents;
  }

  @GetMapping("aevent/{id}")
  public AEvent getEvent(@PathVariable long id){
    if (repository.findById(id) == null) throw new ResourceNotFoundException("id-"+id);

    return repository.findById(id);
  }

  @PostMapping("aevent/{id}/register")
  public ResponseEntity<Registration> addRegistration(@PathVariable long id) {

    System.out.println(id);
    System.out.println("AElement");
    AEvent savedEvent = repository.findById(id);
    System.out.println(savedEvent);
    if(savedEvent.getStatus().equals("PUBLISHED"))
      throw new RuntimeException("Event is already published.");

    if(savedEvent.getRegistrations().size() >= savedEvent.getMaxParticipants())
      throw new RuntimeException("Too many registration for this event.");

    Registration registration = new Registration(savedEvent);
    registrationsRepositoryJPA.save(registration);
    URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
      .buildAndExpand(registration.getId()).toUri();

    return ResponseEntity.created(location).body(registration);
  }

  @PostMapping("aevent")
  public ResponseEntity<AEvent> setEvent(@RequestBody AEvent event) {
    AEvent savedEvent = repository.save(event);

    URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
      .buildAndExpand(savedEvent.getID()).toUri();

    return ResponseEntity.created(location).body(savedEvent);
  }

  @PutMapping("aevent")
  public ResponseEntity<AEvent> updateOrReplaceEvent(@RequestBody AEvent aEvent) {
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
