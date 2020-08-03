package nl.workingtalent.bieb.controller;

import nl.workingtalent.bieb.domein.Boek;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BoekService {
     @Autowired
     BoekRepository boekRepository;

     public Boek opslaan(Boek nieuwBoek) {
          System.out.println("Boek opslaan");
          return boekRepository.save(nieuwBoek);
     }

     public List<Boek> ophalenAlleBoeken() {
          System.out.println("Alle boeken ophalen");
          return (List<Boek>) boekRepository.findAll();
     }

     public Boek ophalenBoek(long id) {
          System.out.println("Haal boek " + id + " op");
          return boekRepository.findById(id).orElse(null);
     }

     public void verwijderBoek(long id) {
          System.out.println("Verwijder boek " + id);
          boekRepository.deleteById(id);
     }

     //TODO ???
     public Boek updateBoek(long id, Boek nieuwBoek) {
          System.out.println("Update boek " + id);
          Boek bestaandBoek = boekRepository.findById(id).orElse(null);

          if (bestaandBoek != null) {
               bestaandBoek.setWtId(nieuwBoek.getWtId());
               bestaandBoek.setIsbn(nieuwBoek.getIsbn());
               bestaandBoek.setTitel(nieuwBoek.getTitel());
               bestaandBoek.setAuteur(nieuwBoek.getAuteur());
               bestaandBoek.setStatus(nieuwBoek.isStatus());
               bestaandBoek.setCategorie(nieuwBoek.getCategorie());
               bestaandBoek.setOmslag(nieuwBoek.getOmslag());
               bestaandBoek.setOmschrijving(nieuwBoek.getOmschrijving());

               return boekRepository.save(bestaandBoek);
          } else {
               return boekRepository.save(nieuwBoek);
          }
     }


}
