package nl.workingtalent.bieb.controller;

import nl.workingtalent.bieb.domein.Account;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public interface AccountRepository extends CrudRepository <Account, Long> {
//    @Query("SELECT id FROM Exemplaar e WHERE e.boek.id = ?1 AND e.workingTalentExemplaarId = ?2")
//    long zoekExemplaarId(Long boekId, Long exemplaarId);

    //Override CrudRepository or PagingAndSortingRepository's query method:
    @Override
    @Query("select e from Account e where e.active=true")
    public List<Account> findAll();

    //Look up deleted entities
    @Query("select e from Account e where e.active=false")
    public List<Account> recycleBin();

    //Soft delete.
    @Query("update Account e set e.active=false where e.id=?1")
    @Modifying
    public void softDelete(Long id);

    public Account findByEmail(String email);
}
