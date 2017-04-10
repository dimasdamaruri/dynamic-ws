package id.go.depdagri.adminduk.api.controller.security;

import id.go.depdagri.adminduk.api.controller.base.BaseRestController;
import id.go.depdagri.adminduk.api.domain.security.SecManMUser;
import id.go.depdagri.adminduk.api.dto.MenuDTO;
import id.go.depdagri.adminduk.api.repository.security.UserRepository;
import id.go.depdagri.adminduk.api.util.helper.MenuTreeHelper;
import java.net.URI;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.util.UriTemplate;

@Controller
@RequestMapping("/api/user")
public class SecManMUserController extends BaseRestController<SecManMUser, String, UserRepository> {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private UserRepository repository;

    protected SecManMUserController() {
        super(SecManMUser.class);
    }

    public UserRepository getRepository() {
        return repository;
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@Valid @RequestBody SecManMUser o, HttpServletRequest request, HttpServletResponse response) {

        if (o.getPassword() != null) {
            o.setSalt(RandomStringUtils.randomAlphabetic(26));
            o.setPassword(repository.encodePassword(o.getPassword(), o.getSalt()));
        }

        repository.save(o);

        addLogForAction(request, "Create " + o.toString());

        String requestUrl = request.getRequestURL().toString();
        URI uri = new UriTemplate("{requestUrl}{id}").expand(requestUrl, o.getId());
        response.setHeader("Location", uri.toASCIIString());
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable String id, @Valid @RequestBody SecManMUser o, HttpServletRequest request, HttpServletResponse response) {

        SecManMUser a = repository.findOne(id);

        if (o.getPassword() != null) {
            o.setSalt(RandomStringUtils.randomAlphabetic(26));
            o.setPassword(repository.encodePassword(o.getPassword(), o.getSalt()));
        } else {
            o.setSalt(a.getSalt());
            o.setPassword(a.getPassword());
        }

        if (a == null) {
            logger.warn("SecManMUser dengan id [{}] tidak ditemukan", id);
            throw new IllegalStateException();
        }

        String action = "Update from " + a.toString() + " to ";

        o.updateAttributes(a);
        repository.save(o);

        action += o.toString();
        addLogForAction(request, action);

        String requestUrl = request.getRequestURL().toString();
        URI uri = new UriTemplate("{requestUrl}{id}").expand(requestUrl, o.getId());
        response.setHeader("Location", uri.toASCIIString());
    }

    @RequestMapping(value = "/menu", method = RequestMethod.GET)
    @ResponseBody
    public MenuDTO showMenu() {
        SecManMUser user = (SecManMUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user == null) {
            return new MenuDTO("No Option");
        }
        return MenuTreeHelper.buildTree(user);
    }

    @RequestMapping(value = "/loggedUser", method = RequestMethod.GET)
    @ResponseBody
    public SecManMUser loggedUser() {
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof SecManMUser) {
            return (SecManMUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        } else {
            return null;
        }

    }

}
