package nl.workingtalent.bieb.rest;

import nl.workingtalent.bieb.controller.BoekService;
import nl.workingtalent.bieb.domein.Boek;
import nl.workingtalent.bieb.domein.Exemplaar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class BoekEndpoint {
    @Autowired
    BoekService boekService;

    @GetMapping("/boeken")
    public List<Boek> boekenAlles(@RequestParam(required = false) String titel) {
        if (titel == null) {
            return boekService.ophalenAlleBoeken();
        } else {
            return boekService.ophalenAlleBoekenMetTitel(titel);
        }
    }

    @GetMapping("/boeken/beschikbaar")
    public List<Boek> boekenBeschikbaar() {
        return boekService.ophalenAlleBoekenMetStatus(true);
    }

    @GetMapping("/boeken/{id}")
    public Boek boekenEen(@PathVariable Long id) {
        return boekService.ophalenBoek(id);
    }

    @GetMapping("/boeken/{id}/exemplaren")
    public List<Exemplaar> boekExemplaren(@PathVariable Long id) {
        return boekService.ophalenBoek(id).getExemplaren();
    }

    @GetMapping("/boeken/{id}/exemplaren/{idx}")
    public Exemplaar boekExemplarenEen(@PathVariable Long id, @PathVariable int idx) {
        List<Exemplaar> exemplaren = boekService.ophalenBoek(id).getExemplaren();
        if (exemplaren == null) {
            return null;
        } else {
            if (idx < exemplaren.size() && idx >= 0) {
                return exemplaren.get(idx);
            } else {
                return null;
            }
        }
    }

    @PostMapping("/boeken")
    public Boek nieuwBoek(@Valid @RequestBody Boek nieuwBoek) {
        return boekService.opslaan(nieuwBoek);
    }

    @DeleteMapping("/boeken/{id}")
    public void boekenWeg(@PathVariable Long id) {
        boekService.verwijderBoek(id);
    }

    @PutMapping("/boeken/{id}")
    public Boek updateBoek(@PathVariable Long id, @Valid @RequestBody Boek nieuwBoek) {
        return boekService.updateBoek(id, nieuwBoek);
    }
}

