package nl.workingtalent.bieb.domein;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

// TODO Account koppelen

@Entity
public class Uitlening {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private Date uitleenDatum;
    private Date inleverDatum;

    public Uitlening() {
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

}
