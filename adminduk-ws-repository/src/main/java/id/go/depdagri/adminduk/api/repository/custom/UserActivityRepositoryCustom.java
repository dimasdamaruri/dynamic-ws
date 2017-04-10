package id.go.depdagri.adminduk.api.repository.custom;


import id.go.depdagri.adminduk.api.domain.security.SecManTUserActivity;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserActivityRepositoryCustom {
    SecManTUserActivity findOne(Integer id, boolean childIncluded);

    List<SecManTUserActivity> findAll(boolean childIncluded);

    Page<SecManTUserActivity> findAll(boolean childIncluded, Pageable pageable);

}
