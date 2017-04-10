package id.go.depdagri.adminduk.api.repository.security;

import id.go.depdagri.adminduk.api.domain.security.SecManMGroup;
import java.util.List;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface GroupRepository extends PagingAndSortingRepository<SecManMGroup, Integer> {

    public List<SecManMGroup> findByNamaContaining(@Param("nama") String nama);

}
