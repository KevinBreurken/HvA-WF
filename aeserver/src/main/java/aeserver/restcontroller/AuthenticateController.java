package aeserver.restcontroller;

import aeserver.exceptions.PreConditionFailedException;
import aeserver.exceptions.UnAuthorizedException;
import aeserver.helpers.APIConfig;
import aeserver.models.User;
import aeserver.security.JWToken;
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
  APIConfig appConfig;

  @PostMapping("authenticate/login")
  public ResponseEntity<User> login(@RequestBody ObjectNode json) {
    System.out.println(json);
    String email = json.get("eMail") == null ? null : json.get("eMail").asText();
    String password = json.get("passWord") == null ? null : json.get("passWord").asText();

    if (password.equals(email.split("@")[0])) {
      User user = new User(email, password);
      JWToken token = new JWToken(user.getName(), user.getEmail(), user.getId(), user.isAdmin());
      String tokenString = token.encode(appConfig.issuer, appConfig.passphrase, appConfig.expiration);
      return ResponseEntity.accepted().header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenString).body(user);
    } else throw new UnAuthorizedException("Cannot authenticate user by email=" + email + " and password=" + password);

  }
}
