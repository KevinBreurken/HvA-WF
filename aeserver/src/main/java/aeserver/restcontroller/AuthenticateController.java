package aeserver.restcontroller;

import aeserver.exceptions.UnAuthorizedException;
import aeserver.models.User;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticateController {

  @PostMapping("authenticate/login")
  public ResponseEntity<User> login(@RequestBody ObjectNode json) {
    String email = json.get("eMail").asText();
    String passWord = json.get("passWord").asText();

    if (passWord.equals(email.split("@")[0]))
      return ResponseEntity.accepted().body(new User(email, passWord));
    else throw new UnAuthorizedException("Cannot authenticate user by email=" + email + " and password=" + passWord);

  }
}
