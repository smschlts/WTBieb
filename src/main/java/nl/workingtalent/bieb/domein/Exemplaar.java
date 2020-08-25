package nl.workingtalent.bieb.domein;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@Entity
@Table(name = "exemplaren")
public class Exemplaar {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    private BoekStatus status;
    private long workingTalentExemplaarId;

    @ManyToOne( fetch = FetchType.EAGER)
    @JsonIgnoreProperties("exemplaren")
    private Boek boek;

    public Exemplaar() {
    }

    public Exemplaar(long workingTalentExemplaarId) {
        this.workingTalentExemplaarId = workingTalentExemplaarId;
        this.status = BoekStatus.BESCHIKBAAR;
    }

    public Exemplaar(BoekStatus status, Boek boek) {
        this.status = status;
        this.boek = boek;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public BoekStatus getStatus() {
        return status;
    }

    public void setStatus(BoekStatus status) {
        this.status = status;
    }

    public long getworkingTalentExemplaarId() {
        return workingTalentExemplaarId;
    }

    public void setworkingTalentExemplaarId(long workingTalentId) {
        this.workingTalentExemplaarId = workingTalentId;
    }

    public Boek getBoek() {
        return boek;
    }

    public void setBoek(Boek boek) {
        this.boek = boek;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Exemplaar exemplaar = (Exemplaar) o;
        return id == exemplaar.id &&
                workingTalentExemplaarId == exemplaar.workingTalentExemplaarId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}




