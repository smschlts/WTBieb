package nl.workingtalent.bieb.rest;

import nl.workingtalent.bieb.controller.ExemplaarService;
import nl.workingtalent.bieb.domein.BoekStatus;
import nl.workingtalent.bieb.domein.Exemplaar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ExemplaarEndpoint {
    @Autowired
    ExemplaarService exemplaarService;

    @GetMapping("/exemplaren")
    public List<Exemplaar> exemplarenOphalen() {
        return exemplaarService.ophalenAlleExemplaren();
    }

    @GetMapping("/exemplaren/{id}")
    public Exemplaar ExemplaarEen(@PathVariable Long id) {
        return exemplaarService.ophalenExemplaar(id);
    }

    @PatchMapping("/exemplaren/{id}")
    public Exemplaar patchExemplaar(@PathVariable Long id, @RequestParam(required = true) BoekStatus status){
        return exemplaarService.patchExemplaar(id, status);
    }
}
