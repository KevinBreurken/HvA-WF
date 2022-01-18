package aeserver.restcontroller;

import aeserver.exceptions.ResourceNotFoundException;
import aeserver.models.AEvent;
import aeserver.models.ExternalEvent;
import aeserver.models.User;
import aeserver.repositories.AEventsRepository;
import aeserver.repositories.UserRepositoryJPA;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@CrossOrigin
@RestController
public class UserController {

  private final UserRepositoryJPA repository;
  private final AEventsRepository aEventsRepository;

  public UserController(UserRepositoryJPA repository, AEventsRepository aEventsRepository) {
    this.repository = repository;
    this.aEventsRepository = aEventsRepository;
  }

  @CrossOrigin
  @PostMapping("users/{userId}/external-events")
  public ResponseEntity<User> addExternalEvent(@PathVariable long userId, @RequestBody ExternalEvent event) {
    User user = repository.findById(userId);

    if (user == null)
      throw new ResourceNotFoundException("User does not exist");

    if (event.getUserId() != userId)
      throw new IllegalArgumentException("Arguments aren't valid");

    aEventsRepository.save(event);

    URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{userId}")
      .buildAndExpand(user.getId()).toUri();

    return ResponseEntity.created(location).body(user);
  }
}
