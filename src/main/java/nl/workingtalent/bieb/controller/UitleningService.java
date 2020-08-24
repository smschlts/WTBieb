package nl.workingtalent.bieb.controller;

import nl.workingtalent.bieb.domein.Uitlening;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class UitleningService {
    @Autowired
    UitleningRepository uitleningRepository;

    public Uitlening opslaan(Uitlening nieuweUitlening) {
        System.out.println("Uitlening opslaan");
        return uitleningRepository.save(nieuweUitlening);
    }

    public List<Uitlening> ophalenAlleUitleningen() {
        System.out.println("Alle uitleningen ophalen");
        return (List<Uitlening>) uitleningRepository.findAll();
    }

    public List<Uitlening> ophalenAlleUitleningenMetAccountId(long accountid) {
        System.out.println("Alle uitleningen ophalen met account id " + accountid);
        return (List<Uitlening>) uitleningRepository.findByAccountId(accountid);
    }

    public List<Uitlening> ophalenAlleUitleningenMetExemplaarId(long exemplaarid) {
        System.out.println("Alle uitleningen ophalen met exemplaar id " + exemplaarid);
        return (List<Uitlening>) uitleningRepository.findByExemplarenId(exemplaarid);
    }

    public Uitlening ophalenUitlening(long id) {
        System.out.println("Haal uitlening " + id + " op");
        return uitleningRepository.findById(id).orElse(null);
    }

    public void verwijderUitlening(long id) {
        System.out.println("Verwijder uitlening " + id);
        uitleningRepository.deleteById(id);
    }

    public Uitlening updateUitlening(long id, Uitlening nieuweUitlening) {
        System.out.println("Update Uitlening " + id);
        Uitlening bestaandeUitlening = uitleningRepository.findById(id).orElse(null);

        if (bestaandeUitlening != null) {
            bestaandeUitlening.setUitleenDatum(nieuweUitlening.getUitleenDatum());
            bestaandeUitlening.setInleverDatum(nieuweUitlening.getInleverDatum());
            bestaandeUitlening.setBoek(nieuweUitlening.getBoek());
            bestaandeUitlening.setAccount(nieuweUitlening.getAccount());

            return uitleningRepository.save(bestaandeUitlening);
        } else {
            return uitleningRepository.save(nieuweUitlening);
        }
    }

    public Uitlening inleverUitlening(Long id) {
        Uitlening bestaandeUitlening = uitleningRepository.findById(id).orElse(null);

        if (bestaandeUitlening != null) {
            bestaandeUitlening.setInleverDatum(LocalDate.now());

            return uitleningRepository.save(bestaandeUitlening);
        } else {
            return null;
        }
    }

    public List<Uitlening> ophalenActieveUitleningen() {
        return (List<Uitlening>) uitleningRepository.findActieveUitleningen();
    }
}