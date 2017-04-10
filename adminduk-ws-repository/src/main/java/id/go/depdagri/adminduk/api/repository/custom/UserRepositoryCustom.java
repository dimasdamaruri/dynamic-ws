package id.go.depdagri.adminduk.api.repository.custom;

import id.go.depdagri.adminduk.api.domain.security.SecManMGroup;
import id.go.depdagri.adminduk.api.domain.security.SecManMUser;
import java.util.List;

public interface UserRepositoryCustom {
    String encodePassword(String plain, String salt);

    SecManMUser create(String username, String plainPassword);

    SecManMUser create(String username, String plainPassword, List<SecManMGroup> groups);

    SecManMUser changePassword(String username, String plainPassword);

    SecManMUser changeGroup(String username, List<SecManMGroup> groups);
}
