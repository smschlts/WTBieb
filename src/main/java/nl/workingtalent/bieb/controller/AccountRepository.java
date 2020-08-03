package nl.workingtalent.bieb.controller;

import nl.workingtalent.bieb.domein.Account;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

@Component
public interface AccountRepository extends CrudRepository <Account, Long> {

}
