package nl.workingtalent.bieb.domein;

import javax.persistence.*;

@Entity
@Table(name = "boeken")
public class Boek {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private long id;
    private long wtId;
    private String isbn;
    private String titel;
    private String auteur;
    private boolean status;
    private String categorie;
    private String omslag;
    private String omschrijving;

    public Boek() {
    }

    public Boek(long wtId, String isbn, String titel, String auteur, String categorie, String omslag, String omschrijving) {
        this.wtId = wtId;
        this.isbn = isbn;
        this.titel = titel;
        this.auteur = auteur;
        this.status = true;
        this.categorie = categorie;
        this.omslag = omslag;
        this.omschrijving = omschrijving;
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    public long getWtId() {
        return wtId;
    }
    public void setWtId(long wtId) {
        this.wtId = wtId;
    }

    public String getIsbn() {
        return isbn;
    }
    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getTitel() {
        return titel;
    }
    public void setTitel(String titel) {
        this.titel = titel;
    }

    public String getAuteur() {
        return auteur;
    }
    public void setAuteur(String auteur) {
        this.auteur = auteur;
    }

    public boolean isStatus() {
        return status;
    }
    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getCategorie() {
        return categorie;
    }
    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public String getOmslag() {
        return omslag;
    }
    public void setOmslag(String omslag) {
        this.omslag = omslag;
    }

    public String getOmschrijving() {
        return omschrijving;
    }
    public void setOmschrijving(String omschrijving) {
        this.omschrijving = omschrijving;
    }
}
