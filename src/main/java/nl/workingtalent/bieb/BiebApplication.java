package nl.workingtalent.bieb;

import nl.workingtalent.bieb.controller.AccountRepository;
import nl.workingtalent.bieb.controller.BoekRepository;
import nl.workingtalent.bieb.controller.ExemplaarRepository;
import nl.workingtalent.bieb.controller.UitleningRepository;
import nl.workingtalent.bieb.domein.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.time.LocalDate;

@SpringBootApplication
public class BiebApplication {

	public static void main(String[] args) {
		SpringApplication.run(BiebApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD");
			}
		};
	}

	@Bean
	public CommandLineRunner demo(BoekRepository boekRepository, AccountRepository accountRepository,
								  UitleningRepository uitleningRepository, ExemplaarRepository exemplaarRepository) {
		return (args) -> {
			Boek b1 = new Boek(0, "9789045353197", "Programmeren met Java voor dummies", "Barry Burd", "Java", "niet beschikbaar", "Java is een van de populairste programmeertalen ter wereld en wordt gebruikt bij het ontwikkelen van websites.");
			Boek b2 = new Boek(0, "9789045355450", "Programmeren voor Dummies", "Wallace Wang", "Programmeren algemeen", "niet beschikbaar", "Met de volledig bijgewerkte nieuwe editie van Programmeren voor Dummies leer je op een vlotte manier programma's schrijven die probleemloos werken onder Windows, macOS en Linux. Maak kennis met de verschillende programmeertalen");
			Boek b3 = new Boek(0, "9789045354866", "Programmeren met C voor Dummies", "Dan Gookin", "C", "niet beschikbaar", "C is een van de oudste en meest gebruikte programmeertalen. De invloed van C is zo groot dat verschillende andere talen (zoals C++, Java en JavaScript) grotendeels de syntaxis van C gebruiken.");
			Boek b4 = new Boek(0, "9789045353524", "Programmeren met Python voor Dummies", "John Paul Mueller", "Python", "niet beschikbaar", "Python is een van de snelst groeiende programmeertalen ter wereld. En dat is niet zo gek: Python is zeer geschikt om verschillende soorten programmeerconcepten mee te ontdekken en het is de ideale taal voor data-analyses.");

			Exemplaar e1 = new Exemplaar(BoekStatus.BESCHIKBAAR);
			Exemplaar e2 = new Exemplaar(BoekStatus.BESCHIKBAAR);
			Exemplaar e3 = new Exemplaar(BoekStatus.BESCHIKBAAR);
			Exemplaar e4 = new Exemplaar(BoekStatus.BESCHIKBAAR);

			b1.voegExemplaarToe(e1);
			b1.voegExemplaarToe(e2);
			b2.voegExemplaarToe(e3);
			b2.voegExemplaarToe(e4);

			boekRepository.save(b1);
			boekRepository.save(b2);
			boekRepository.save(b3);
			boekRepository.save(b4);

			Account ac1 = new Account("Els", "elsje@haha.nl", "meloen3");
			Account ac2 = new Account("Piet", "teip@haha.nl", "meloen4");
			accountRepository.save(ac1);
			accountRepository.save(ac2);

			Uitlening ul1 = new Uitlening(LocalDate.of(2019, 7, 19), LocalDate.of(2019, 7, 19), b2, ac2);
			uitleningRepository.save(ul1);
		};

	}

}
