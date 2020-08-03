package nl.workingtalent.bieb.domein;


import com.sun.istack.NotNull;

import javax.persistence.*;

@Entity
@Table(name = "accounts")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @NotNull
    private String naam;
    @NotNull
    private String email;
    @NotNull
    private String wachtwoord;

    public Account() {
    }

    public Account(String naam, String email, String wachtwoord) {
        this.naam = naam;
        this.email = email;
        this.wachtwoord = wachtwoord;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNaam() {
        return naam;
    }

    public void setNaam(String naam) {
        this.naam = naam;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getWachtwoord() {
        return wachtwoord;
    }

    public void setWachtwoord(String wachtwoord) {
        this.wachtwoord = wachtwoord;
    }
}
