package nl.workingtalent.bieb.rest;

import nl.workingtalent.bieb.controller.BoekService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BoekEndpoint {
    @Autowired
    BoekService boekService;

    @GetMapping("/boeken")
    public String boeken() {
        System.out.println("Hij doet het");
        return "Test";
    }
}
