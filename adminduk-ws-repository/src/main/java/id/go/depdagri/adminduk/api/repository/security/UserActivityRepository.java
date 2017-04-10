package id.go.depdagri.adminduk.api.repository.security;

import id.go.depdagri.adminduk.api.domain.security.SecManTUserActivity;
import id.go.depdagri.adminduk.api.repository.custom.UserActivityRepositoryCustom;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserActivityRepository extends PagingAndSortingRepository<SecManTUserActivity, Integer>, UserActivityRepositoryCustom {


}
