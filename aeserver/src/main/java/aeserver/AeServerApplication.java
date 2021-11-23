package aeserver;

import aeserver.models.AEvent;
import aeserver.repositories.AEventsRepository;
import aeserver.repositories.AEventsRepositoryJpa;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.logging.Logger;


@SpringBootApplication
public class AeServerApplication implements WebMvcConfigurer, CommandLineRunner {
  @Autowired
  private AEventsRepository aEventsRepository;

	public static void main(String[] args) {
		SpringApplication.run(AeServerApplication.class, args);
	}

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**").allowedOrigins("http://localhost:4200").allowedMethods("GET","POST","PUT","DELETE");
  }

  @Override
  public void run(String... args) throws Exception {
    aEventsRepository.save(AEvent.createRandomAEvent());
    aEventsRepository.save(AEvent.createRandomAEvent());
    aEventsRepository.save(AEvent.createRandomAEvent());
  }
}
