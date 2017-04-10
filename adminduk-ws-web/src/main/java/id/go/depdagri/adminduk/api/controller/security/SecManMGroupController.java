package id.go.depdagri.adminduk.api.controller.security;

import id.go.depdagri.adminduk.api.controller.base.BaseRestController;
import id.go.depdagri.adminduk.api.domain.security.SecManMGroup;
import id.go.depdagri.adminduk.api.repository.security.GroupRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/group")
public class SecManMGroupController extends BaseRestController<SecManMGroup, Integer, GroupRepository> {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private GroupRepository repository;

    protected SecManMGroupController() {
        super(SecManMGroup.class);
    }

    public GroupRepository getRepository() {
        return repository;
    }

}
