package nl.workingtalent.bieb.domein;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "uitleningen")
public class Uitlening {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @NotNull
    private LocalDateTime uitleenDatum;
    private LocalDateTime inleverDatum;

    @NotNull
    @ManyToOne
    private Boek boek;

    @NotNull
    @ManyToOne
    private Account account;

    public Uitlening() {
    }

    public Uitlening(LocalDateTime uitleenDatum, LocalDateTime inleverDatum, Boek boek, Account account) {
        this.uitleenDatum = uitleenDatum;
        this.inleverDatum = inleverDatum;
        this.boek = boek;
        this.account = account;
    }

    public Uitlening(LocalDateTime uitleenDatum, LocalDateTime inleverDatum) {
        this.uitleenDatum = uitleenDatum;
        this.inleverDatum = inleverDatum;
    }

    public Uitlening(LocalDateTime uitleenDatum) {
        this.uitleenDatum = uitleenDatum;}


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDateTime getUitleenDatum() {
        return uitleenDatum;
    }

    public void setUitleenDatum(LocalDateTime uitleenDatum) {
        this.uitleenDatum = uitleenDatum;
    }

    public LocalDateTime getInleverDatum() {
        return inleverDatum;
    }

    public void setInleverDatum(LocalDateTime inleverDatum) {
        this.inleverDatum = inleverDatum;
    }

    public Boek getBoek() {
        return boek;
    }

    public void setBoek(Boek boek) {
        this.boek = boek;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }
}
