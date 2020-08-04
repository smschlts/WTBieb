package nl.workingtalent.bieb.controller;

import nl.workingtalent.bieb.domein.Uitlening;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

@Component
public interface UitleningRepository extends CrudRepository<Uitlening, Long> {

}
