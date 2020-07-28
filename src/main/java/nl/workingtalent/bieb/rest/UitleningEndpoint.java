package nl.workingtalent.bieb.rest;


import nl.workingtalent.bieb.controller.UitleningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UitleningEndpoint {
    @Autowired
    UitleningService uitleningService;

    @GetMapping("/uitlening")
    public String uitlening() {
        System.out.println("Hij doet het");
        return "Test";
    }
}
