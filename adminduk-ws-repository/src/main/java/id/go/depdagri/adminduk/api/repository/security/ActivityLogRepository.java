package id.go.depdagri.adminduk.api.repository.security;

import id.go.depdagri.adminduk.api.domain.security.SecManTActivityLog;
import id.go.depdagri.adminduk.api.domain.security.SecManTUserActivity;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ActivityLogRepository extends PagingAndSortingRepository<SecManTActivityLog, Integer> {
    List<SecManTActivityLog> findByUserActivity(SecManTUserActivity userActivity);

    Page<SecManTActivityLog> findByUserActivity(SecManTUserActivity userActivity, Pageable pageable);


}
