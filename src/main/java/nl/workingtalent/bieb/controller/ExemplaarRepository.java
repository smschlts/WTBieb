package nl.workingtalent.bieb.controller;

import nl.workingtalent.bieb.domein.Exemplaar;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

@Component
public interface ExemplaarRepository extends CrudRepository <Exemplaar, Long> {

}
