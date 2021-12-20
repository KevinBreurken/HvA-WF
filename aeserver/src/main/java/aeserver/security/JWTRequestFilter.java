package aeserver.security;

import aeserver.helpers.APIConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.security.sasl.AuthenticationException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Set;

@Component
public class JWTRequestFilter extends OncePerRequestFilter {
  @Autowired
  APIConfig apiConfig;

  private static final Set<String> SECURED_PATHS =
    Set.of("/aevent", "/registrations", "/users");


  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
    throws ServletException, IOException {
    try {
      String servletPath = request.getServletPath();

      if (HttpMethod.OPTIONS.matches(request.getMethod()) ||
        SECURED_PATHS.stream().noneMatch(servletPath::startsWith)) {

        chain.doFilter(request, response);
        return;
      }

      JWToken jwToken = null;

      String encryptedToken = request.getHeader(HttpHeaders.AUTHORIZATION);

      if (encryptedToken != null) {
        encryptedToken = encryptedToken.replace("Bearer ", "");
        jwToken = JWToken.decode(encryptedToken, apiConfig.passphrase);

      }

      if (jwToken == null) {
        throw new AuthenticationException("You need to logon first.");
      }

      request.setAttribute(jwToken.JWT_ATTRIBUTE_NAME, jwToken);

      chain.doFilter(request, response);
    } catch (AuthenticationException e) {
      response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication error");
      return;
    }
  }
}
