package nl.workingtalent.bieb;

import nl.workingtalent.bieb.controller.AccountRepository;
import nl.workingtalent.bieb.controller.BoekRepository;
import nl.workingtalent.bieb.controller.UitleningRepository;
import nl.workingtalent.bieb.domein.Account;
import nl.workingtalent.bieb.domein.Boek;
import nl.workingtalent.bieb.domein.Uitlening;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Date;

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
	public CommandLineRunner demo(BoekRepository boekRepository, AccountRepository accountRepository, UitleningRepository uitleningRepository) {
		return (args) -> {
			Boek b1 = new Boek(0, "123456", "titeltje", "Auteur", "CatAdventure", "Heel mooi", "Er was eens");
			Boek b2 = new Boek(0, "1245645656", "Nog eits", "haha", "Iets", "Heel nee", "Erens");
			boekRepository.save(b1);
			boekRepository.save(b2);

			Account ac1 = new Account("Els", "elsje@haha.nl", "meloen3");
			Account ac2 = new Account("Piet", "teip@haha.nl", "meloen4");
			accountRepository.save(ac1);
			accountRepository.save(ac2);

			Uitlening ul1 = new Uitlening(new Date(2020, 10, 5), new Date(2020, 10, 5), b2, ac2);
			uitleningRepository.save(ul1);
		};

	}

}
