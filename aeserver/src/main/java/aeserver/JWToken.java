package aeserver;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JWToken {

  private static final String JWT_USERNAME_CLAIM = "sub";
  private static final String JWT_USERID_CLAIM = "id";
  private static final String JWT_ADMIN_CLAIM = "admin";

  @Value("${jwt.issuer.MyOrganisation}")
  private String issuer;

  @Value("${jwt.pass-phrase}")
  private String passphrase;

  @Value("${jwt.duration-of-validity:1200}")
  private int tokenDurationOfValidity;

  private static Key getKey(String passPhrase) {
    byte hmacKey[] = passPhrase.getBytes(StandardCharsets.UTF_8);
    Key key = new SecretKeySpec(hmacKey, SignatureAlgorithm.HS512.getJcaName());
    return key;
  }

  public String encode(String userName, String id, boolean admin) {
    Key key = getKey(passphrase);

    String token = Jwts.builder()
      .claim(JWT_USERNAME_CLAIM, userName)
      .claim(JWT_USERID_CLAIM, id)
      .claim(JWT_ADMIN_CLAIM, admin)
      .setIssuer(issuer)
      .setIssuedAt(new Date())
      .setExpiration(new Date(System.currentTimeMillis() + tokenDurationOfValidity * 1000L))
      .signWith(key, SignatureAlgorithm.HS512)
      .compact();

    return token;
  }
}
