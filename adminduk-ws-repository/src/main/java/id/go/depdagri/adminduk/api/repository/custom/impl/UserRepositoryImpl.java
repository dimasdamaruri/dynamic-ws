package id.go.depdagri.adminduk.api.repository.custom.impl;

import id.go.depdagri.adminduk.api.domain.security.SecManMGroup;
import id.go.depdagri.adminduk.api.domain.security.SecManMUser;
import id.go.depdagri.adminduk.api.repository.custom.UserRepositoryCustom;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class UserRepositoryImpl implements UserRepositoryCustom {
    @PersistenceContext
    protected EntityManager entityManager;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public String encodePassword(String plain, String salt) {
        return passwordEncoder.encodePassword(plain, salt);
    }

    public SecManMUser create(String username, String plainPassword) {

        SecManMUser user = new SecManMUser(username);

        user.setSalt(RandomStringUtils.randomAlphabetic(26));
        user.setPassword(passwordEncoder.encodePassword(plainPassword, user.getSalt()));
        user.setEnabled(true);
        entityManager.persist(user);
        return user;

    }

    public SecManMUser create(String username, String plainPassword, List<SecManMGroup> groups) {

        SecManMUser user = new SecManMUser();
        user.setUsername(username);
        user.setEnabled(true);
        user.setSalt(RandomStringUtils.randomAlphabetic(26));
        user.setPassword(passwordEncoder.encodePassword(plainPassword, user.getSalt()));
        user.setGroups(groups);
        entityManager.persist(user);
        return user;

    }

    public SecManMUser changePassword(String username, String plainPassword) {
        SecManMUser user = entityManager.find(SecManMUser.class, username);

        if (user == null) {
            return null;
        }

        user.setSalt(RandomStringUtils.randomAlphabetic(26));
        user.setPassword(passwordEncoder.encodePassword(plainPassword, user.getSalt()));

        entityManager.merge(user);
        return user;
    }

    public SecManMUser changeGroup(String username, List<SecManMGroup> groups) {
        SecManMUser user = entityManager.find(SecManMUser.class, username);

        if (user == null) {
            return null;
        }

        user.setGroups(groups);
        entityManager.merge(user);
        return user;
    }

    public void delete(SecManMUser user) {
        if (user == null) {
            return;
        }
        SecManMUser merged = entityManager.merge(user);
        entityManager.remove(merged);
    }
}
