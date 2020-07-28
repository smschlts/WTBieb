package nl.workingtalent.bieb.rest;


import nl.workingtalent.bieb.controller.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountEndpoint {
    @Autowired
    AccountService accountService;

    @GetMapping("/account")
    public String accounts() {
        System.out.println("hij doet het");
        return "test";
    }


}
