package id.go.depdagri.adminduk.api.domain.security;

import id.go.depdagri.adminduk.api.domain.base.Base;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "secman_m_user")
public class SecManMUser extends Base<String> implements UserDetails {

    /**
     *
     */
    private static final long serialVersionUID = -7042556874624318973L;

    public SecManMUser() {
    }

    public SecManMUser(String id) {
        super(id);
    }

    @Id
    @GenericGenerator(name = "seq_id_user", strategy = "id.go.depdagri.adminduk.api.generator.UserIdGenerator")
    @GeneratedValue(generator = "seq_id_user")
    @Column(name = "user_id", unique = true, nullable = false, length = 15)
    private String id;

    @Length(max = 255)
    @Column(name = "nip", length = 255)
    private String nip;

    @Length(max = 255)
    @Column(name = "nama", length = 255)
    private String nama;

    @Length(max = 255)
    @Column(name = "email", length = 255)
    private String email;

    @Length(max = 255)
    @Column(name = "telphone", length = 255)
    private String telphone;

    @Length(max = 255)
    @Column(name = "handphone", length = 255)
    private String handphone;


    @NotNull
    @Column(length = 50, name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "salt", nullable = false)
    private String salt;

    @Column(name = "enabled", nullable = false)
    private boolean enabled;

    @Transient
    private boolean accountNonExpired = true;
    @Transient
    private boolean accountNonLocked = true;
    @Transient
    private boolean credentialsNonExpired = true;

    @ManyToMany
    @JoinTable(name = "secman_m_user_group")
    @LazyCollection(value = LazyCollectionOption.FALSE)
    private Collection<SecManMGroup> groups;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<SecManMRole> authorities = new HashSet<SecManMRole>();
        if (groups != null) {
            //For each akan menghasilkan NPE apabila Collection/array yg di iterate berupa null
            for (SecManMGroup o : groups) {
                if (o.isEnabled()) {
                    for (SecManMRole r : o.getRoles()) {
                        authorities.add(r);
                    }
                }

            }
        }

        return authorities;
    }

    public void setAuthorities(List o) {
        //do nothing
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNip() {
        return nip;
    }

    public void setNip(String nip) {
        this.nip = nip;
    }

    public String getNama() {
        return nama;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelphone() {
        return telphone;
    }

    public void setTelphone(String telphone) {
        this.telphone = telphone;
    }

    public String getHandphone() {
        return handphone;
    }

    public void setHandphone(String handphone) {
        this.handphone = handphone;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public boolean isAccountNonExpired() {
        return accountNonExpired;
    }

    public void setAccountNonExpired(boolean accountNonExpired) {
        this.accountNonExpired = accountNonExpired;
    }

    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    public void setAccountNonLocked(boolean accountNonLocked) {
        this.accountNonLocked = accountNonLocked;
    }

    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }

    public void setCredentialsNonExpired(boolean credentialsNonExpired) {
        this.credentialsNonExpired = credentialsNonExpired;
    }

    public Collection<SecManMGroup> getGroups() {
        return groups;
    }

    public void setGroups(Collection<SecManMGroup> groups) {
        this.groups = groups;
    }

    @Override
    public String toString() {
        return "SecManMUser{" +
                "id='" + id + '\'' +
                ", nip='" + nip + '\'' +
                ", nama='" + nama + '\'' +
                ", email='" + email + '\'' +
                ", telphone='" + telphone + '\'' +
                ", handphone='" + handphone + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", salt='" + salt + '\'' +
                ", enabled=" + enabled +
                ", accountNonExpired=" + accountNonExpired +
                ", accountNonLocked=" + accountNonLocked +
                ", credentialsNonExpired=" + credentialsNonExpired +
                ", groups=" + groups +
                '}';
    }


}
