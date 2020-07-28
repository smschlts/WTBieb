package nl.workingtalent.bieb.controller;

import nl.workingtalent.bieb.domein.Boek;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;


@Component
public interface BoekInterface extends CrudRepository<Boek, Long> {


}
