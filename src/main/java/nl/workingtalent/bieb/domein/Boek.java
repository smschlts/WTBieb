package nl.workingtalent.bieb.domein;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;
import nl.workingtalent.bieb.rest.ExemplaarEndpoint;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "boeken")
public class Boek {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private long wtId;
    @NotNull
    private String isbn;
    @NotNull
    private String titel;
    private String auteur;
    @NotNull
    private boolean status;
    private String categorie;
    private String omslag;
    private String omschrijving;
    private int aantal;


    @OneToMany(
            mappedBy = "boek",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonIgnoreProperties("boek")
    private List<Exemplaar> exemplaren = new ArrayList<>();

    public Boek() {
    }

    public Boek(long wtId, String isbn, String titel, String auteur, String categorie, String omslag, String omschrijving, int aantal) {
        this.wtId = wtId;
        this.isbn = isbn;
        this.titel = titel;
        this.auteur = auteur;
        this.status = true;
        this.categorie = categorie;
        this.omslag = omslag;
        this.omschrijving = omschrijving;

        this.voegAantalExemplarenToe(aantal);

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

    public List<Exemplaar> getExemplaren() {
        return exemplaren;
    }

    public int getAantal() {
        return aantal;
    }

    public void setAantal(int aantal) {
        this.aantal = aantal;
    }

    public void voegExemplaarToe(Exemplaar exemplaar) {
        exemplaren.add(exemplaar);
        exemplaar.setBoek(this);
    }

    public void voegAantalExemplarenToe(int aantalExemplaren) {
        for (int i = 0; i < aantalExemplaren; i++) {
            Exemplaar e = new Exemplaar(exemplaren.size() + i + 1);
            exemplaren.add(e);
            e.setBoek(this);
        }

        aantal += aantalExemplaren;
    }

//    public void verwijderExemplaar(Exemplaar exemplaar) {
//        exemplaren.remove(exemplaar);
//        exemplaar.setBoek(null);
//    }
}
