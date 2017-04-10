package id.go.depdagri.adminduk.api.controller.security;

import id.go.depdagri.adminduk.api.controller.base.BaseRestController;
import id.go.depdagri.adminduk.api.domain.security.SecManMRole;
import id.go.depdagri.adminduk.api.repository.security.RoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/role")
public class SecManMRoleController extends BaseRestController<SecManMRole, String, RoleRepository> {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private RoleRepository repository;

    protected SecManMRoleController() {
        super(SecManMRole.class);
    }

    public RoleRepository getRepository() {
        return repository;
    }

}
