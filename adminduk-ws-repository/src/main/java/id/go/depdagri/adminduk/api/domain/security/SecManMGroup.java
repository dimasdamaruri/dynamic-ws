package id.go.depdagri.adminduk.api.domain.security;

import id.go.depdagri.adminduk.api.domain.base.Base;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.Collection;

@Entity
@Table(name = "secman_m_group")
public class SecManMGroup extends Base<Integer> {

    /**
     *
     */
    private static final long serialVersionUID = 5999292964530970102L;


    public SecManMGroup() {
    }

    public SecManMGroup(Integer id) {
        super(id);
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
//    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "group_id")
    private Integer id;

    @NotNull
    @Length(max = 255)
    @Column(name = "nama", length = 255, unique = true)
    private String nama;

    @Length(max = 255)
    @Column(name = "deskripsi", length = 255)
    private String deskripsi;

    @Column(name = "enabled", nullable = false)
    @NotNull
    private boolean enabled;

    @ManyToMany
    @JoinTable(name = "secman_m_group_role")
    @LazyCollection(value = LazyCollectionOption.FALSE)
    private Collection<SecManMRole> roles;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNama() {
        return nama;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public String getDeskripsi() {
        return deskripsi;
    }

    public void setDeskripsi(String deskripsi) {
        this.deskripsi = deskripsi;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public Collection<SecManMRole> getRoles() {
        return roles;
    }

    public void setRoles(Collection<SecManMRole> roles) {
        this.roles = roles;
    }

    @Override
    public String toString() {
        return "SecManMGroup{" +
                "id=" + id +
                ", nama='" + nama + '\'' +
                ", deskripsi='" + deskripsi + '\'' +
                ", enabled=" + enabled +
                ", roles=" + roles +
                '}';
    }

}
