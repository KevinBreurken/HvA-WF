package aeserver.restcontroller;

import aeserver.exceptions.PreConditionFailedException;
import aeserver.exceptions.ResourceNotFoundException;
import aeserver.models.AEvent;
import aeserver.models.ExternalEvent;
import aeserver.models.User;
import aeserver.repositories.AEventsRepository;
import aeserver.repositories.AEventsRepositoryJpa;
import aeserver.repositories.UserRepositoryJPA;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@CrossOrigin
@RestController
public class UserController {

  private final UserRepositoryJPA repository;

  public UserController(UserRepositoryJPA repository) {
    this.repository = repository;
  }

  @PostMapping("users/{userId}/external-events")
  public ResponseEntity<User> addExternalEvent(@PathVariable long userId) {
    ExternalEvent aEvent = new ExternalEvent();
    User user = repository.findById(userId);

    URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
      .buildAndExpand(userId).toUri();

    if (user == null)
      throw new ResourceNotFoundException("User does not yet exist");

    user.getExternalEvents().add(aEvent);
    repository.update(user);

    return ResponseEntity.created(location).body(user);
  }

  @PutMapping("external-events/{eventId}")
  public ResponseEntity<ExternalEvent> updateOrReplaceExternalEvent(@PathVariable long eventId) {
    ExternalEvent externalEvent = repository.findExternalEvent(eventId);

    if (externalEvent == null)
      throw new ResourceNotFoundException("External event cannot be found");

    externalEvent.setVisible(!externalEvent.isVisible());

    return ResponseEntity.ok(externalEvent);
  }
}
