package nl.hva.aeserver.restcontroller;

import nl.hva.aeserver.entity.Greeting;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloRestController {

    @GetMapping("/rest/hello")
    public Greeting greet(
                @RequestParam(name = "msg",required = false, defaultValue = "Hello") String message,
                @RequestParam(name = "person", required = false, defaultValue = "John Doe") String name) {

        return new Greeting(message,name);
    }

}
