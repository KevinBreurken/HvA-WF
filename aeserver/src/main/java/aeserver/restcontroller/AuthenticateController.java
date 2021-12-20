package aeserver.restcontroller;

import aeserver.JWToken;
import aeserver.exceptions.UnAuthorizedException;
import aeserver.models.User;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticateController {

  @Autowired
  JWToken tokengenerator;

  @PostMapping("authenticate/login")
  public ResponseEntity<User> login(@RequestBody ObjectNode json) {
    String email = json.get("eMail").asText();
    String passWord = json.get("passWord").asText();

    if (passWord.equals(email.split("@")[0])) {
      User user = new User(email, passWord);
      String tokenString = tokengenerator.encode(user.getName(),user.getId().toString(),user.isAdmin());
      return ResponseEntity.accepted().header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenString).body(user);
    } else throw new UnAuthorizedException("Cannot authenticate user by email=" + email + " and password=" + passWord);

  }
}
