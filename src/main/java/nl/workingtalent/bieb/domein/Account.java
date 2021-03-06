package nl.workingtalent.bieb.domein;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Collection;


@Entity
@Table(name = "accounts")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    private String naam;

    @NotNull
    @Column(unique = true)
    private String email;
    private String wachtwoord;

    //Active is de boolean voor een de soft-delete van accounts
    //Als accounts helemaal zouden worden verwijderd dan gaat dit niet goed in leningen.
    @Column(name="active")
    private Boolean active;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name="account_role",
            joinColumns={@JoinColumn(name="USER_ID", referencedColumnName="ID")},
            inverseJoinColumns={@JoinColumn(name="ROLE_ID", referencedColumnName="ID")})
    private Collection<Role> roles = new ArrayList<>();


    public Account() {
    }

    public Account(String naam, String email, String wachtwoord) {
        this.naam = naam;
        this.email = email;
        this.wachtwoord = wachtwoord;
        this.active = true;
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

    public Collection<Role> getRoles() {
        return roles;
    }

//    public void setRoles(Collection<Role> roles) {
//        this.roles = roles;
//    }

    public void voegRolToe(Role rol) {
        roles.add(rol);
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}
