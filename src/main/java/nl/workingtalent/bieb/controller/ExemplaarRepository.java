package nl.workingtalent.bieb.controller;

import nl.workingtalent.bieb.domein.Exemplaar;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

@Component
public interface ExemplaarRepository extends CrudRepository <Exemplaar, Long> {
    @Query("SELECT id FROM Exemplaar e WHERE e.boek.id = ?1 AND e.workingTalentExemplaarId = ?2")
    long zoekExemplaarId(Long boekId, Long exemplaarId);
}
