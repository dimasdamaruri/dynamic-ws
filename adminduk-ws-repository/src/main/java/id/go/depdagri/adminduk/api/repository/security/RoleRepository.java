package id.go.depdagri.adminduk.api.repository.security;

import id.go.depdagri.adminduk.api.domain.security.SecManMRole;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface RoleRepository extends PagingAndSortingRepository<SecManMRole, String> {
}
