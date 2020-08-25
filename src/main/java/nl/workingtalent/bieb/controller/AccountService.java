package nl.workingtalent.bieb.controller;


import nl.workingtalent.bieb.domein.Account;
import nl.workingtalent.bieb.domein.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AccountService implements UserDetailsService {
    @Autowired
    AccountRepository accountRepository;

    final private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Account opslaan(Account nieuwAccount) {
        System.out.println("Account opslaan");
        if (nieuwAccount.getWachtwoord() == null) {
            nieuwAccount.setWachtwoord(passwordEncoder.encode("ww"));
        } else {
            nieuwAccount.setWachtwoord(passwordEncoder.encode(nieuwAccount.getWachtwoord()));
        }

        nieuwAccount.setActive(true);
//        nieuwAccount.setRoles(Arrays.asList(new Role("ROLE_USER")));
        nieuwAccount.voegRolToe(new Role("ROLE_USER"));

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
        accountRepository.softDelete(id);
    }

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

    public Account patchAccount(long id, Account nieuwAccount) {
        System.out.println("Patch account " + id);
        Account bestaandAccount = accountRepository.findById(id).orElse(null);

        if (bestaandAccount != null) {
            bestaandAccount.setNaam(nieuwAccount.getNaam());
            bestaandAccount.setEmail(nieuwAccount.getEmail());

            return accountRepository.save(bestaandAccount);
        } else {
            return null;
        }
    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Account account = accountRepository.findByEmail(username);
        if (account == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(account.getEmail(), account.getWachtwoord(), mapRolesToAuthorities(account.getRoles()));
    }

    private Collection < ? extends GrantedAuthority > mapRolesToAuthorities(Collection < Role > roles) {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
    }
}
