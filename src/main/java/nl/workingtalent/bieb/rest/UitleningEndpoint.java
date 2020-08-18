package nl.workingtalent.bieb.rest;

import nl.workingtalent.bieb.controller.ExemplaarService;
import nl.workingtalent.bieb.controller.UitleningService;
import nl.workingtalent.bieb.domein.BoekStatus;
import nl.workingtalent.bieb.domein.Uitlening;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UitleningEndpoint {
    @Autowired
    UitleningService uitleningService;
    @Autowired
    ExemplaarService exemplaarService;

    @GetMapping("/uitleningen")
    public List<Uitlening> uitleningenAlles() {
        return uitleningService.ophalenAlleUitleningen();
    }

    @GetMapping("/uitleningen/{id}")
    public Uitlening uitleningEen(@PathVariable Long id) {
        return uitleningService.ophalenUitlening(id);
    }

    @PostMapping("/uitleningen")
    public Uitlening nieuweUitlening(@RequestBody Uitlening nieuweUitlening) {
        exemplaarService.patchExemplaar(nieuweUitlening.getBoek().getId(), nieuweUitlening.getExemplaarId(), BoekStatus.UITGELEEND);
        return uitleningService.opslaan(nieuweUitlening);
    }

    @DeleteMapping("/uitleningen/{id}")
    public void uitleningWeg(@PathVariable Long id) {
        uitleningService.verwijderUitlening(id);
    }

    @PutMapping("/uitleningen/{id}")
    public Uitlening updateUitlening(@PathVariable Long id, @RequestBody Uitlening nieuweUitlening) {
        return uitleningService.updateUitlening(id, nieuweUitlening);
    }

    @PutMapping("/uitleningen/{id}/inlever")
    public Uitlening inleverUitlening(@PathVariable Long id) {
        System.out.println("Inleveren " + id);
        Uitlening bestaandeUitlening = uitleningService.ophalenUitlening(id);
        if (bestaandeUitlening != null) {
            exemplaarService.patchExemplaar(bestaandeUitlening.getBoek().getId(), bestaandeUitlening.getExemplaarId(), BoekStatus.BESCHIKBAAR);
        }

        return uitleningService.inleverUitlening(id);
    }
}
