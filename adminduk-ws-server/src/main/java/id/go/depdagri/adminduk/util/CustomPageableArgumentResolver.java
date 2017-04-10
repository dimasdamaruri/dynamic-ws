package id.go.depdagri.adminduk.util;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableArgumentResolver;

/**
 * Deny Prasetyo, S.T.
 * jasoet87@gmail.com
 * [at] jasoet
 * github.com/jasoet
 * bitbucket.org/jasoet
 */
public class CustomPageableArgumentResolver extends PageableArgumentResolver {

    public CustomPageableArgumentResolver(int size) {
        super.setFallbackPagable(new PageRequest(0, size));
    }
}
