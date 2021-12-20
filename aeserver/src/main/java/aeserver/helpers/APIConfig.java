package aeserver.helpers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class APIConfig implements WebMvcConfigurer {

  @Value("${jwt.issuer:private company}")
  public String issuer;

  @Value("${jwt.pass-phrase:This is very secret information for my private company}")
  public String passphrase;

  @Value("${jwt.expiration-second:1200}")
  public int expiration;

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
      .allowedHeaders("GET", "POST", "PUT", "DELETE")
      .allowedOrigins("http://localhost:4200")
      .allowCredentials(true)
      .allowedHeaders("*")
      .exposedHeaders("Authorization");
  }
}

