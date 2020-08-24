package nl.workingtalent.bieb.domein;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sun.istack.NotNull;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "uitleningen")
public class Uitlening {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @NotNull
    private LocalDate uitleenDatum;
    private LocalDate inleverDatum;

    @NotNull
    @ManyToOne
    private Boek boek;

    @NotNull
    private long exemplaarId;

    @NotNull
    @ManyToOne
    private Account account;

    public Uitlening() {
    }

    public Uitlening(LocalDate uitleenDatum, LocalDate inleverDatum, Boek boek, Account account, long exemplaarId) {
        this.uitleenDatum = uitleenDatum;
        this.inleverDatum = inleverDatum;
        this.boek = boek;
        this.account = account;
        this.exemplaarId = exemplaarId;
    }

    public Uitlening(LocalDate uitleenDatum, LocalDate inleverDatum) {
        this.uitleenDatum = uitleenDatum;
        this.inleverDatum = inleverDatum;
    }

    public Uitlening(LocalDate uitleenDatum) {
        this.uitleenDatum = uitleenDatum;}


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @JsonFormat(pattern="dd-MM-yyyy")
    public LocalDate getUitleenDatum() {
        return uitleenDatum;
    }

    @JsonFormat(pattern="yyyy-MM-dd")
    public void setUitleenDatum(LocalDate uitleenDatum) {
        this.uitleenDatum = uitleenDatum;
    }

    @JsonFormat(pattern="dd-MM-yyyy")
    public LocalDate getInleverDatum() {
        return inleverDatum;
    }

    @JsonFormat(pattern="yyyy-MM-dd")
    public void setInleverDatum(LocalDate inleverDatum) {
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

    public long getExemplaarId() {
        return exemplaarId;
    }

    public void setExemplaarId(long exemplaarId) {
        this.exemplaarId = exemplaarId;
    }
}
