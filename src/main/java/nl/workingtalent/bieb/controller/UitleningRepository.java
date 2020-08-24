package nl.workingtalent.bieb.controller;

import nl.workingtalent.bieb.domein.Boek;
import nl.workingtalent.bieb.domein.Uitlening;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface UitleningRepository extends CrudRepository<Uitlening, Long> {
    List<Uitlening> findByAccountId(long accountId);
    @Query("SELECT u FROM Uitlening u JOIN Exemplaar e ON (u.boek.id = e.boek.id AND u.exemplaarId = e.workingTalentExemplaarId) WHERE e.id = ?1")
    List<Uitlening> findByExemplarenId(long exemplarenId);

    @Query("SELECT u FROM Uitlening u JOIN Exemplaar e ON (u.boek.id = e.boek.id AND u.exemplaarId = e.workingTalentExemplaarId) WHERE e.id = ?1 AND u.inleverDatum = NULL")
    Uitlening findLaatsteOningeleverdeExemplaarUitlening(long exemplaarId);

    @Query("SELECT u FROM Uitlening u WHERE u.inleverDatum = NULL")
    List<Uitlening> findActieveUitleningen();
}
