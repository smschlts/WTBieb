package nl.workingtalent.bieb.rest;

import nl.workingtalent.bieb.controller.AccountService;
import nl.workingtalent.bieb.domein.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class AccountEndpoint {
    @Autowired
    AccountService accountService;

    @GetMapping("/accounts")
    public List<Account> accountsAlles() {
        return accountService.ophalenAlleAccounts();
    }

    @GetMapping("/accounts/{id}")
    public Account AccountEen(@PathVariable Long id) {
        return accountService.ophalenAccount(id);
    }

    @PostMapping("/accounts")
    public Account nieuwAccount(@Valid  @RequestBody Account nieuwAccount) {
        return accountService.opslaan(nieuwAccount);
    }

    @DeleteMapping("/accounts/{id}")
    public void accountWeg(@PathVariable Long id) {
        accountService.verwijderAccount(id);
    }

    @PutMapping("/accounts/{id}")
    public Account updateAccount(@PathVariable Long id, @Valid @RequestBody Account nieuwAccount) {
        return accountService.updateAccount(id, nieuwAccount);
    }

    @PatchMapping("/accounts/{id}")
    public Account patchAccount(@PathVariable Long id, @RequestBody Account nieuwAccount) {
        return accountService.patchAccount(id, nieuwAccount);
    }

}
