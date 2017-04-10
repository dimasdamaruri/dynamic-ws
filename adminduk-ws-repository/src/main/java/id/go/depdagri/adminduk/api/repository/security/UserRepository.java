package id.go.depdagri.adminduk.api.repository.security;

import id.go.depdagri.adminduk.api.domain.security.SecManMUser;
import id.go.depdagri.adminduk.api.repository.custom.UserRepositoryCustom;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserRepository extends PagingAndSortingRepository<SecManMUser, String>, UserRepositoryCustom {
    SecManMUser findByUsername(String username);

}
