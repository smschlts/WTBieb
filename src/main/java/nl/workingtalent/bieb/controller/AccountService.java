package nl.workingtalent.bieb.controller;


import nl.workingtalent.bieb.domein.Account;
import nl.workingtalent.bieb.domein.Boek;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class AccountService {
    @Autowired
    AccountRepository accountRepository;

    //Hier komen alle methodes die met de database te maken hebben.

    public Account opslaan(Account nieuwAccount) {
        System.out.println("Account opslaan");
        return accountRepository.save(nieuwAccount);
    }

    public List<Account> ophalenAlleAccounts() {
        System.out.println("Alle accounts ophalen");
        return (List<Account>) accountRepository.findAll();
    }

    public Account ophalenAccount(long id) {
        System.out.println("Haal account " + id + " op");
        return accountRepository.findById(id).orElse(null);
    }

    public void verwijderAccount(long id) {
        System.out.println("Verwijder account " + id);
        accountRepository.deleteById(id);
    }

    //TODO ???
    public Account updateAccount(long id, Account nieuwAccount) {
        System.out.println("Update account " + id);
        Account bestaandAccount = accountRepository.findById(id).orElse(null);

        if (bestaandAccount != null) {
            bestaandAccount.setNaam(nieuwAccount.getNaam());
            bestaandAccount.setEmail(nieuwAccount.getEmail());
            bestaandAccount.setWachtwoord(nieuwAccount.getWachtwoord());

            return accountRepository.save(bestaandAccount);
        } else {
            return accountRepository.save(nieuwAccount);
        }
    }

}
