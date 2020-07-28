package nl.workingtalent.bieb.controller;

import nl.workingtalent.bieb.domein.Boek;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class BoekService {
     @Autowired
     BoekRepository boekRepository;

     public Boek opslaan(Boek nieuwBoek) {
          System.out.println("Boek opslaan");
          return boekRepository.save(nieuwBoek);

     }


}
