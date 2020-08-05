package nl.workingtalent.bieb.rest;

import nl.workingtalent.bieb.controller.ExemplaarService;
import nl.workingtalent.bieb.domein.Exemplaar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ExemplaarEndpoint {
    @Autowired
    ExemplaarService exemplaarService;

    @GetMapping("/exemplaren")
    public List<Exemplaar> accountsExemplaar() {
        return exemplaarService.ophalenAlleExemplaren();
    }

    @GetMapping("/exemplaren/{id}")
    public Exemplaar AccountEen(@PathVariable Long id) {
        return exemplaarService.ophalenExemplaar(id);
    }
}
