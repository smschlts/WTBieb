package nl.workingtalent.bieb.controller;

import nl.workingtalent.bieb.domein.Boek;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface BoekRepository extends CrudRepository<Boek, Long> {
    List<Boek> findByTitelContaining(String titel);
}
