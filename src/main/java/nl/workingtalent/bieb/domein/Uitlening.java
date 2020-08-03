package nl.workingtalent.bieb.domein;

import javax.persistence.*;
import java.util.Date;

// TODO Account koppelen

@Entity
@Table(name = "uitleningen")
public class Uitlening {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private Date uitleenDatum;
    private Date inleverDatum;

    @ManyToOne
    private Boek boek;

    @ManyToOne
    private Account account;

    public Uitlening() {
    }

    public Uitlening(Date uitleenDatum, Date inleverDatum, Boek boek, Account account) {
        this.uitleenDatum = uitleenDatum;
        this.inleverDatum = inleverDatum;
        this.boek = boek;
        this.account = account;
    }

    public Uitlening(Date uitleenDatum, Date inleverDatum) {
        this.uitleenDatum = uitleenDatum;
        this.inleverDatum = inleverDatum;
    }

    public Uitlening(Date uitleenDatum) {
        this.uitleenDatum = uitleenDatum;}


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getUitleenDatum() {
        return uitleenDatum;
    }

    public void setUitleenDatum(Date uitleenDatum) {
        this.uitleenDatum = uitleenDatum;
    }

    public Date getInleverDatum() {
        return inleverDatum;
    }

    public void setInleverDatum(Date inleverDatum) {
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
