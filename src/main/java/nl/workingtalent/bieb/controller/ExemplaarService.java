package nl.workingtalent.bieb.controller;


import nl.workingtalent.bieb.domein.Account;
import nl.workingtalent.bieb.domein.BoekStatus;
import nl.workingtalent.bieb.domein.Exemplaar;
import nl.workingtalent.bieb.domein.Uitlening;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class ExemplaarService {
    @Autowired
    ExemplaarRepository exemplaarRepository;

    @Autowired
    UitleningRepository uitleningRepository;

    public Exemplaar opslaan(Exemplaar nieuwExemplaar) {
        System.out.println("Exemplaar opslaan");
        return exemplaarRepository.save(nieuwExemplaar);
    }

    public List<Exemplaar> ophalenAlleExemplaren() {
        System.out.println("Alle exemplaren ophalen");
        return (List<Exemplaar>) exemplaarRepository.findAll();
    }

    public Exemplaar ophalenExemplaar(long id) {
        System.out.println("Haal exemplaar " + id + " op");
        return exemplaarRepository.findById(id).orElse(null);
    }

    public void verwijderExemplaar(long id) {
        System.out.println("Verwijder exemplaar " + id);
        exemplaarRepository.deleteById(id);
    }

    public Exemplaar updateExemplaar(long id, Exemplaar nieuwExemplaar) {
        System.out.println("Update exemplaar " + id);
        Exemplaar bestaandExemplaar = exemplaarRepository.findById(id).orElse(null);

        if (bestaandExemplaar != null) {
            bestaandExemplaar.setStatus(nieuwExemplaar.getStatus());
            bestaandExemplaar.setworkingTalentExemplaarId(nieuwExemplaar.getworkingTalentExemplaarId());

            return exemplaarRepository.save(bestaandExemplaar);
        } else {
            return exemplaarRepository.save(nieuwExemplaar);
        }
    }

    public Exemplaar patchExemplaar(long boekId, long exemplaarId, BoekStatus nieuweStatus) {
        System.out.println("Update status boek " + boekId + ", exemplaar " + exemplaarId);
        long id = exemplaarRepository.zoekExemplaarId(boekId, exemplaarId);
        Exemplaar bestaandExemplaar = exemplaarRepository.findById(id).orElse(null);
        if (bestaandExemplaar != null) {
            bestaandExemplaar.setStatus(nieuweStatus);
            return exemplaarRepository.save(bestaandExemplaar);
        } else {
            return null;
        }
    }

    public Exemplaar patchExemplaar(long id, BoekStatus nieuweStatus) {
        System.out.println("Patch exemplaar " + id);
        Exemplaar bestaandExemplaar = exemplaarRepository.findById(id).orElse(null);

        if (bestaandExemplaar != null) {
            bestaandExemplaar.setStatus(nieuweStatus);

            if (nieuweStatus == BoekStatus.WEG) {
                Uitlening u = uitleningRepository.findLaatsteOningeleverdeExemplaarUitlening(id);
                if (u.getInleverDatum() == null) {
                    u.setInleverDatum(LocalDate.now());
                    uitleningRepository.save(u);
                }
            }

            return exemplaarRepository.save(bestaandExemplaar);
        } else {
            return null;
        }
    }
}
