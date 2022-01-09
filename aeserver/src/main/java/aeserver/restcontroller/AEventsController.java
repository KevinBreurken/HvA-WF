package aeserver.restcontroller;

import aeserver.exceptions.ResourceNotFoundException;
import aeserver.models.AEvent;
import aeserver.models.Registration;
import aeserver.repositories.AEventsRepository;
import aeserver.repositories.RegistrationsRepositoryJPA;
import org.hibernate.procedure.ParameterMisuseException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
public class AEventsController {

  private final AEventsRepository repository;
  private final RegistrationsRepositoryJPA registrationsRepositoryJPA;

  public AEventsController(AEventsRepository aEventsRepository, RegistrationsRepositoryJPA registrationsRepositoryJPA) {
    repository = aEventsRepository;
    this.registrationsRepositoryJPA = registrationsRepositoryJPA;
  }

  @GetMapping("aevents")
  public List<AEvent> getAllAEvents(@RequestParam Optional<String> title, @RequestParam Optional<String> status, @RequestParam Optional<Integer> minRegistrations) throws Exception {

    int activeParamAmount = (title.isPresent() ? 1 : 0) + (status.isPresent() ? 1 : 0) + (minRegistrations.isPresent() ? 1 : 0);
    if (activeParamAmount > 1)
      throw new ParameterMisuseException("Too many requestParams assigned. only one is allowed");

    List<AEvent> aEvents = new ArrayList<>();

    if (title.isPresent())
      aEvents = repository.findByQuery("AEvent_find_by_title", title.get());
    if (status.isPresent()) {
      if (!AEvent.isStatusValid(status.get())) {
        throw new Exception(String.format("Status of name %s is not a valid statusName.", status.get()));
      }
      aEvents = repository.findByQuery("AEvent_find_by_status", status.get());
    }
    if (minRegistrations.isPresent())
      aEvents = repository.findByQuery("AEvent_find_by_minRegistrations", minRegistrations.get());

    if (activeParamAmount == 0)
      aEvents = repository.findAll();

    if (aEvents.size() == 0) throw new ResourceNotFoundException("No events to be found.");
    return aEvents;
  }

  @GetMapping("aevent/{id}")
  public AEvent getEvent(@PathVariable long id) {
    if (repository.findById(id) == null) throw new ResourceNotFoundException("id-" + id);

    return repository.findById(id);
  }

  @PostMapping("aevent/{id}/register")
  public ResponseEntity<Registration> addRegistration(@PathVariable long id) {

    AEvent savedEvent = repository.findById(id);
    if (savedEvent.getStatus().equals("PUBLISHED"))
      throw new RuntimeException("Event is already published.");

    if (savedEvent.getRegistrations().size() >= savedEvent.getMaxParticipants())
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
    if (repository.findById(id) == null) throw new ResourceNotFoundException("id-" + id);

    AEvent event = getEvent(id);
    event.getRegistrations().clear();

    boolean isRemoved = repository.remove(id);

    return ResponseEntity.ok(isRemoved);
  }

}
