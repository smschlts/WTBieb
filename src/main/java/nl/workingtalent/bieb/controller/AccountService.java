package nl.workingtalent.bieb.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class AccountService {
    @Autowired
    AccountRepository accountRepository;

    //Hier komen alle methodes die met de database te maken hebben.


}
