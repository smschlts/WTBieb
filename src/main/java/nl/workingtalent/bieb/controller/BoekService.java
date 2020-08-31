package nl.workingtalent.bieb.controller;

import nl.workingtalent.bieb.domein.Boek;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class BoekService {
     @Autowired
     BoekRepository boekRepository;

     public Boek opslaan(Boek nieuwBoek) {
          System.out.println("Boek opslaan");
          nieuwBoek.voegAantalExemplarenToe(nieuwBoek.getAantal());
          return boekRepository.save(nieuwBoek);
     }

     public List<Boek> ophalenAlleBoeken() {
          System.out.println("Alle boeken ophalen");
          return (List<Boek>) boekRepository.findAll();
     }

     public List<Boek> ophalenAlleBoekenMetTitel(String titel) {
          System.out.println("Alle boeken ophalen met in de titel: " + titel);
          return (List<Boek>) boekRepository.findByTitelContaining(titel);
     }

     public Boek ophalenBoek(long id) {
          System.out.println("Haal boek " + id + " op");
          return boekRepository.findById(id).orElse(null);
     }

     public void verwijderBoek(long id) {
          System.out.println("Verwijder boek " + id);
          boekRepository.deleteById(id);
     }

     public Boek updateBoek(long id, Boek nieuwBoek) {
          System.out.println("Update boek " + id);
          Boek bestaandBoek = boekRepository.findById(id).orElse(null);

          if (bestaandBoek != null) {
               bestaandBoek.voegAantalExemplarenToe(nieuwBoek.getAantal());

               bestaandBoek.setWtId(nieuwBoek.getWtId());
               bestaandBoek.setIsbn(nieuwBoek.getIsbn());
               bestaandBoek.setTitel(nieuwBoek.getTitel());
               bestaandBoek.setAuteur(nieuwBoek.getAuteur());
               bestaandBoek.setCategorie(nieuwBoek.getCategorie());
               bestaandBoek.setOmslag(nieuwBoek.getOmslag());
               bestaandBoek.setOmschrijving(nieuwBoek.getOmschrijving());
               bestaandBoek.setAantal(nieuwBoek.getAantal()+bestaandBoek.getAantal());


               return boekRepository.save(bestaandBoek);

          } else {
               return boekRepository.save(nieuwBoek);
          }
     }
}
