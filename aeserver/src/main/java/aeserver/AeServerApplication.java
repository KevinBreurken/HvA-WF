package aeserver;

import aeserver.models.AEvent;
import aeserver.models.Registration;
import aeserver.repositories.AEventsRepository;
import aeserver.repositories.RegistrationsRepositoryJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@SpringBootApplication
public class AeServerApplication implements WebMvcConfigurer, CommandLineRunner {
  @Autowired
  private AEventsRepository aEventsRepository;

  @Autowired
  private RegistrationsRepositoryJPA registrationsRepositoryJPA;

  public static void main(String[] args) {
    SpringApplication.run(AeServerApplication.class, args);
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
      .allowedOrigins("http://localhost:4200")
      .allowedMethods("GET", "POST", "PUT", "DELETE")
      .allowCredentials(true)
      .allowedHeaders(HttpHeaders.AUTHORIZATION, HttpHeaders.CONTENT_TYPE)
      .exposedHeaders(HttpHeaders.AUTHORIZATION, HttpHeaders.CONTENT_TYPE);
  }

  @Override
  public void run(String... args) throws Exception {
    AEvent event = aEventsRepository.save(AEvent.createRandomAEvent());
    aEventsRepository.save(AEvent.createRandomAEvent());
    aEventsRepository.save(AEvent.createRandomAEvent());

    registrationsRepositoryJPA.save(Registration.createRandomRegistration(event));
    registrationsRepositoryJPA.save(Registration.createRandomRegistration(event));
    registrationsRepositoryJPA.save(Registration.createRandomRegistration(event));
  }
}
