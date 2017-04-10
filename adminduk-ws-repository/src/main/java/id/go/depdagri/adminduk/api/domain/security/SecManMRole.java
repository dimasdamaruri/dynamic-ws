package id.go.depdagri.adminduk.api.domain.security;

import id.go.depdagri.adminduk.api.domain.base.Base;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name = "secman_m_role")
public class SecManMRole extends Base<String> implements GrantedAuthority {
    @Id
    @Column(length = 50, unique = false)
    @Size(max = 50, min = 1)
    private String authority;

    public SecManMRole() {
    }

    public SecManMRole(String authority) {
        this.authority = authority;
    }

    @Override
    public String getId() {
        return authority;
    }

    @Override
    public void setId(String id) {
        this.authority = id;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SecManMRole role = (SecManMRole) o;

        if (authority != null ? !authority.equals(role.authority) : role.authority != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return authority != null ? authority.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "SecManMRole{" +
                "authority='" + authority + '\'' +
                '}';
    }


}
