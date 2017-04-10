package id.go.depdagri.adminduk.api.repository.custom.impl;

import id.go.depdagri.adminduk.api.domain.security.SecManTActivityLog;
import id.go.depdagri.adminduk.api.domain.security.SecManTUserActivity;
import id.go.depdagri.adminduk.api.repository.custom.UserActivityRepositoryCustom;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@SuppressWarnings("unchecked")
public class UserActivityRepositoryImpl implements UserActivityRepositoryCustom {

    @PersistenceContext
    protected EntityManager entityManager;

    @Override
    public SecManTUserActivity findOne(Integer id, boolean childIncluded) {
        if (id == null) {
            return null;
        }

        if (!childIncluded) {
            return entityManager.find(SecManTUserActivity.class, id);
        }

        SecManTUserActivity result = entityManager.find(SecManTUserActivity.class, id);
        result.setLogs(new ArrayList<SecManTActivityLog>());
        return result;
    }

    @Override
    public List<SecManTUserActivity> findAll(boolean childIncluded) {

        List<SecManTUserActivity> result = entityManager.createQuery("SELECT o FROM SecManTUserActivity o").getResultList();

        if (!childIncluded) {
            for (SecManTUserActivity o : result) {
                o.setLogs(new ArrayList<SecManTActivityLog>());
            }
        }

        return result;
    }

    @Override
    public Page<SecManTUserActivity> findAll(boolean childIncluded, Pageable pageable) {

        String jpql = "SELECT o FROM SecManTUserActivity o ";

        if (pageable.getSort() != null) {
            Iterator<Sort.Order> order = pageable.getSort().iterator();
            if (order.hasNext()) {
                jpql += " ORDER BY ";
            }
            while (order.hasNext()) {
                Sort.Order current = order.next();
                jpql += "o." + current.getProperty() + " " + current.getDirection().toString();

                if (order.hasNext()) {
                    jpql += ", ";
                }
            }
        }

        List<SecManTUserActivity> result = entityManager.createQuery(jpql).setFirstResult(pageable.getPageNumber() * pageable.getPageSize()).setMaxResults(pageable.getPageSize()).getResultList();
        Long total = (Long) entityManager.createQuery("SELECT count(o) FROM SecManTUserActivity o").getSingleResult();
        if (!childIncluded) {
            for (SecManTUserActivity o : result) {
                o.setLogs(new ArrayList<SecManTActivityLog>());
            }
        }

        return new PageImpl<SecManTUserActivity>(result, pageable, total);
    }
}
