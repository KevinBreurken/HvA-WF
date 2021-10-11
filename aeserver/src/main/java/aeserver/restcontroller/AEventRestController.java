package aeserver.restcontroller;

import aeserver.entity.Greeting;
import aeserver.models.AEvent;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AEventRestController {

  @GetMapping("/aevent")
  public List<AEvent> getAllAEvents() {
    return List.of(new AEvent("Test-event-A"),new AEvent("Test-event-B"));
  }

}
