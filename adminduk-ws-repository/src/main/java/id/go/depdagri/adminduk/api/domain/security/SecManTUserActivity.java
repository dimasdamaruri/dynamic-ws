package id.go.depdagri.adminduk.api.domain.security;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import id.go.depdagri.adminduk.api.domain.base.Base;
import id.go.depdagri.adminduk.api.json.JsonDateDeserializer;
import id.go.depdagri.adminduk.api.json.JsonDateSerializer;
import id.go.depdagri.adminduk.api.mixin.SecManMUserMixin;
import id.go.depdagri.adminduk.api.mixin.SecManTActivityLogMixin;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@Entity
@Table(name = "secman_t_user_activity")
public class SecManTUserActivity extends Base<Integer> {

    /**
     *
     */
    private static final long serialVersionUID = -1352010604158597787L;

    public SecManTUserActivity() {
    }

    public SecManTUserActivity(Integer id) {
        super(id);
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_activity_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id_fk", nullable = false)
    @NotNull
    private SecManMUser user;


    @Column(name = "login_time")
    @Temporal(value = TemporalType.TIMESTAMP)
    @JsonSerialize(using = JsonDateSerializer.class)
    @JsonDeserialize(using = JsonDateDeserializer.class)
    private Date loginTime;

    @Column(name = "logout_time")
    @Temporal(value = TemporalType.TIMESTAMP)
    @JsonSerialize(using = JsonDateSerializer.class)
    @JsonDeserialize(using = JsonDateDeserializer.class)
    private Date logoutTime;


    @OneToMany(fetch = FetchType.EAGER, mappedBy = "userActivity")
    @Cascade(value = {CascadeType.ALL})
    private List<SecManTActivityLog> logs;

    public List<SecManTActivityLog> getLogs() {
        return logs;
    }

    public void setLogs(List<SecManTActivityLog> logs) {
        this.logs = logs;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public SecManMUser getUser() {
        return user;
    }

    public void setUser(SecManMUser user) {
        this.user = user;
    }

    public Date getLoginTime() {
        return loginTime;
    }

    public void setLoginTime(Date loginTime) {
        this.loginTime = loginTime;
    }

    public Date getLogoutTime() {
        return logoutTime;
    }

    public void setLogoutTime(Date logoutTime) {
        this.logoutTime = logoutTime;
    }


    public void updateAttributes(Base<Integer> o) {
        super.updateAttributes(o);

        if (o instanceof SecManTUserActivity) {
            SecManTUserActivity updated = (SecManTUserActivity) o;
            if (this.getLogs().size() == 0) {
                this.setLogs(updated.getLogs());
            }

            for (SecManTActivityLog log : updated.getLogs()) {
                log.setUserActivity(this);
            }
        }


    }


    @Override
    public String toString() {
        return "SecManTUserActivity{" + this.toJsonString() + '}';
    }

    @Override
    public Map<Class<?>, Class<?>> getDefaultMixin() {
        Map<Class<?>, Class<?>> result = new HashMap<Class<?>, Class<?>>();

        result.put(SecManMUser.class, SecManMUserMixin.class);
        result.put(SecManTActivityLog.class, SecManTActivityLogMixin.class);

        return result;
    }
}
