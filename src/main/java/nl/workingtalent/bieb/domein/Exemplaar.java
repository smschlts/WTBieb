package nl.workingtalent.bieb.domein;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "exemplaren")
public class Exemplaar {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    private BoekStatus status;
    private long workingTalentId;

    @ManyToOne( fetch = FetchType.EAGER)
    @JsonIgnoreProperties("exemplaren")
    private Boek boek;

    public Exemplaar() {
    }

    public Exemplaar(BoekStatus status) {
        this.status = status;
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

    public long getWorkingTalentId() {
        return workingTalentId;
    }

    public void setWorkingTalentId(long workingTalentId) {
        this.workingTalentId = workingTalentId;
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
                workingTalentId == exemplaar.workingTalentId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}




