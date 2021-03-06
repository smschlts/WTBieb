package nl.workingtalent.bieb;

import nl.workingtalent.bieb.controller.AccountService;
import nl.workingtalent.bieb.controller.BoekRepository;
import nl.workingtalent.bieb.controller.UitleningRepository;
import nl.workingtalent.bieb.domein.Account;
import nl.workingtalent.bieb.domein.Boek;
import nl.workingtalent.bieb.domein.Uitlening;
import nl.workingtalent.bieb.rest.UitleningEndpoint;
import org.springframework.beans.factory.annotation.Value;
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

	@Value("${admin.naam}")
	private String adminNaam;
	@Value("${admin.wachtwoord}")
	private String adminWachtwoord;
	@Value("${admin.email}")
	private String adminEmail;
	@Value("${user.wachtwoord}")
	private String userWachtwoord;

	//Dit is toegevoegd om problemen met CORS te voorkomen in de front-end.
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "PATCH");
			}
		};
	}

	@Bean
	public CommandLineRunner demo(BoekRepository boekRepository, AccountService accountService,
								  UitleningRepository uitleningRepository, UitleningEndpoint uitleningEndpoint) {
		return (args) -> {
			Boek b1 = new Boek(1, "9789045353197", "Programmeren met Java voor dummies", "Barry Burd", "Java", "niet beschikbaar", "Java is een van de populairste programmeertalen ter wereld en wordt gebruikt bij het ontwikkelen van websites.", 2);
			Boek b2 = new Boek(2, "9789045355450", "Programmeren voor Dummies", "Wallace Wang", "Programmeren algemeen", "niet beschikbaar", "Met de volledig bijgewerkte nieuwe editie van Programmeren voor Dummies leer je op een vlotte manier programma's schrijven die probleemloos werken onder Windows, macOS en Linux. Maak kennis met de verschillende programmeertalen", 2);
			Boek b3 = new Boek(3, "9789045354866", "Programmeren met C voor Dummies", "Dan Gookin", "C", "niet beschikbaar", "C is een van de oudste en meest gebruikte programmeertalen. De invloed van C is zo groot dat verschillende andere talen (zoals C++, Java en JavaScript) grotendeels de syntaxis van C gebruiken.", 2);
			Boek b4 = new Boek(4, "9789045353524", "Programmeren met Python voor Dummies", "John Paul Mueller", "Python", "niet beschikbaar", "Python is een van de snelst groeiende programmeertalen ter wereld. En dat is niet zo gek: Python is zeer geschikt om verschillende soorten programmeerconcepten mee te ontdekken en het is de ideale taal voor data-analyses.", 2);
			boekRepository.save(b1);
			boekRepository.save(b2);
			boekRepository.save(b3);
			boekRepository.save(b4);

			//Voeg admin account toe om in te kunnen loggen
			//zet het in application.properties om het niet te sharen in GitHub
			Account ac1 = new Account(adminNaam, adminEmail, adminWachtwoord);
			Account ac2 = new Account("Stefan Wilmink", "swilmink@testemail.nl", userWachtwoord);
			Account ac3 = new Account("Donald Hermens", "dhermens@testemail.nl", userWachtwoord);
			Account ac4 = new Account("Mariana Huizinga", "mhuizinga@testemail.nl", userWachtwoord);
			Account ac5 = new Account("Merlijn van Rumpt", "mvrumpt@testemail.nl", userWachtwoord);
			accountService.opslaan(ac1);
			accountService.opslaan(ac2);
			accountService.opslaan(ac3);
			accountService.opslaan(ac4);
			accountService.opslaan(ac5);

			Uitlening ul1 = new Uitlening(LocalDate.of(2020, 5, 19), LocalDate.of(2020, 7, 8), b2, ac3, 1);
			Uitlening ul2 = new Uitlening(LocalDate.of(2020, 3, 5), LocalDate.of(2020, 7, 8), b4, ac3, 1);
			Uitlening ul3 = new Uitlening(LocalDate.of(2020, 1, 2), LocalDate.of(2020, 3, 12), b2, ac2, 1);
			Uitlening ul4 = new Uitlening(LocalDate.of(2020, 2, 21), null, b1, ac2, 1);
			Uitlening ul5 = new Uitlening(LocalDate.of(2020, 3, 25), null, b1, ac4, 2);
			Uitlening ul6 = new Uitlening(LocalDate.of(2020, 7, 28), null, b2, ac3, 2);
			uitleningRepository.save(ul1);
			uitleningRepository.save(ul2);
			uitleningRepository.save(ul3);
			// Gebruik uitleningendpoint, zodat het exemplaar op uitgeleend wordt gezet
			uitleningEndpoint.nieuweUitlening(ul4);
			uitleningEndpoint.nieuweUitlening(ul5);
			uitleningEndpoint.nieuweUitlening(ul6);
		};

	}

}
