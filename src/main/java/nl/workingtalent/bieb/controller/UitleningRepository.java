package nl.workingtalent.bieb.controller;

import nl.workingtalent.bieb.domein.Boek;
import nl.workingtalent.bieb.domein.Uitlening;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface UitleningRepository extends CrudRepository<Uitlening, Long> {
    List<Uitlening> findByAccountId(long accountId);
}
