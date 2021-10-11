package aeserver.restcontroller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SimpleHelloRestController {

    @GetMapping("/rest/simple-hello")
    public String sayHello() {
        return "Hello World";
    }

}
