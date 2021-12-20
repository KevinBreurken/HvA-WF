package aeserver.security;
import io.jsonwebtoken.*;

import javax.crypto.spec.SecretKeySpec;
import javax.security.sasl.AuthenticationException;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

public class JWToken {
  public static final String JWT_ATTRIBUTE_NAME = "tokenInfo";
  private static final String JWT_USERNAME_CLAIM = "name";
  private static final String JWT_USERID_CLAIM = "id";
  private static final String JWT_ADMIN_CLAIM = "admin";
  private static final String JWT_USER_EMAIL_CLAIM = "email";

  private String username = "YSN";
  private String email;
  private Long userId = null;
  private boolean admin = false;

  public JWToken() {
  }

  public JWToken(String username, String email, Long userId, boolean admin) {
    this.username = username;
    this.email = email;
    this.userId = userId;
    this.admin = admin;
  }



  public String encode(String issuer, String passPhrase, int expiration) {
    Key key = getKey(passPhrase);

    String token = Jwts.builder()
      .claim(JWT_USERNAME_CLAIM,this.username)
      .claim(JWT_USER_EMAIL_CLAIM,this.email)
      .claim(JWT_USERID_CLAIM,this.userId)
      .claim(JWT_ADMIN_CLAIM,this.admin)
      .setIssuer(issuer) // registered claim
      .setIssuedAt(new Date()) // registered claim
      .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000)) // registered claim
      .signWith(key, SignatureAlgorithm.HS384)
      .compact();


    return token;
  }

  private static Key getKey(String passPhrase) {
    byte hmacKey[] = passPhrase.getBytes(StandardCharsets.UTF_8);
    Key key = new SecretKeySpec(hmacKey, SignatureAlgorithm.HS384.getJcaName());
    return key;
  }

  public static JWToken decode(String encodedToken, String passphrase) throws AuthenticationException {
    try {
      // Validate the token
      Key key = getKey(passphrase);
      Jws<Claims> jws = Jwts.parser().setSigningKey(key).parseClaimsJws(encodedToken);
      Claims claims = jws.getBody();

      JWToken jwToken = new JWToken(claims.get(JWT_USERNAME_CLAIM).toString(),
        claims.get(JWT_USER_EMAIL_CLAIM).toString(),
        Long.valueOf(claims.get(JWT_USERID_CLAIM).toString()),
        (boolean) claims.get(JWT_ADMIN_CLAIM));


      return jwToken;

    } catch (ExpiredJwtException | MalformedJwtException |
      UnsupportedJwtException | IllegalArgumentException| SignatureException e) {
      throw new AuthenticationException(e.getMessage());
    }
  }

}

