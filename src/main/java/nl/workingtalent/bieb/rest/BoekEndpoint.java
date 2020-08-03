package nl.workingtalent.bieb.rest;

import nl.workingtalent.bieb.controller.BoekService;
import nl.workingtalent.bieb.domein.Boek;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BoekEndpoint {
    @Autowired
    BoekService boekService;

    @GetMapping("/boeken")
    public List<Boek> boekenAlles() {
        return boekService.ophalenAlleBoeken();
    }

    @GetMapping("/boeken/{id}")
    public Boek boekenEen(@PathVariable Long id) {
        return boekService.ophalenBoek(id);
    }

    @PostMapping("/boeken")
    public Boek nieuwBoek(@RequestBody Boek nieuwBoek) {
        return boekService.opslaan(nieuwBoek);
    }

    @DeleteMapping("/boeken/{id}")
    public void boekenWeg(@PathVariable Long id) {
        boekService.verwijderBoek(id);
    }

    @PutMapping("/boeken/{id}")
    public Boek updateBoek(@PathVariable Long id, @RequestBody Boek nieuwBoek) {
        return boekService.updateBoek(id, nieuwBoek);
    }

}

