package id.go.depdagri.adminduk.api.domain.base;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import id.go.depdagri.adminduk.api.json.JsonDateDeserializer;
import id.go.depdagri.adminduk.api.json.JsonDateSerializer;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@MappedSuperclass
public abstract class Base<T extends Serializable> extends JsonStringable implements Serializable {


    /**
     *
     */
    private static final long serialVersionUID = -3433899042356843128L;

    @Column(name = "created_by", length = 45)
    private String createdBy;

    @Column(name = "updated_by", length = 45)
    private String updatedBy;


    @Column(name = "entity", length = 45)
    private String entity;


    @Column(name = "created_at")
    @Temporal(value = TemporalType.TIMESTAMP)
    @JsonSerialize(using = JsonDateSerializer.class)
    @JsonDeserialize(using = JsonDateDeserializer.class)
    private Date createdAt;

    @Column(name = "updated_at")
    @Temporal(value = TemporalType.TIMESTAMP)
    @JsonSerialize(using = JsonDateSerializer.class)
    @JsonDeserialize(using = JsonDateDeserializer.class)
    private Date updatedAt;

    protected Base() {
    }

    protected Base(T id) {
        setId(id);
    }

    public abstract T getId();

    public abstract void setId(T id);

    public abstract String toString();

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    @PrePersist
    public void populateCreatedAt() {
        this.setCreatedAt(new Date());
    }

    @PreUpdate
    public void populateUpdatedAt() {
        this.setUpdatedAt(new Date());
    }

    public void updateAttributes(Base<T> o) {
        if (o.getId() != null) {
            this.setId(o.getId());
        }

        if (o.getCreatedAt() != null) {
            this.setCreatedAt(o.getCreatedAt());
        }

        if (o.getCreatedBy() != null) {
            this.setCreatedBy(o.getCreatedBy());
        }

    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public String getEntity() {
        return entity;
    }

    public void setEntity(String entity) {
        this.entity = entity;
    }


}
