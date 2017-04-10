package id.go.depdagri.adminduk.api.controller.security;

import id.go.depdagri.adminduk.api.controller.base.BaseExceptionHandler;
import id.go.depdagri.adminduk.api.domain.security.SecManTActivityLog;
import id.go.depdagri.adminduk.api.domain.security.SecManTUserActivity;
import id.go.depdagri.adminduk.api.repository.security.ActivityLogRepository;
import id.go.depdagri.adminduk.api.repository.security.UserActivityRepository;
import id.go.depdagri.adminduk.api.wrapper.PageJsonWrapper;
import java.net.URI;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.util.UriTemplate;

@Controller
@RequestMapping("/api/userActivity/{id}/log")
public class SecManTActivityLogController extends BaseExceptionHandler {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private ActivityLogRepository repository;

    @Autowired
    private UserActivityRepository activityRepository;

    @RequestMapping(value = "/", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@Valid @PathVariable Integer id, @RequestBody SecManTActivityLog o, HttpServletRequest request, HttpServletResponse response) {
        SecManTUserActivity parent = activityRepository.findOne(id);

        if (parent == null) {
            logger.warn("Parent SecManTUserActivity dengan id [{}] tidak ditemukan", id);
            throw new IllegalStateException();
        }

        o.setUserActivity(new SecManTUserActivity(id));
        repository.save(o);
        String requestUrl = request.getRequestURL().toString();
        URI uri = new UriTemplate("{requestUrl}{id}").expand(requestUrl, o.getId());
        response.setHeader("Location", uri.toASCIIString());
    }


    @RequestMapping("/{logId}")
    @ResponseBody
    public String findById(@PathVariable("id") Integer id, @PathVariable("logId") Integer logId) {
        SecManTUserActivity parent = activityRepository.findOne(id);

        if (parent == null) {
            logger.warn("Parent SecManTUserActivity dengan id [{}] tidak ditemukan", id);
            throw new IllegalStateException();
        }

        SecManTActivityLog o = repository.findOne(logId);
        if (o == null) {
            logger.warn("SecManTActivityLog dengan id [{}] tidak ditemukan", logId);
            throw new IllegalStateException();
        }

        return o.toJsonString();
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{logId}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable("id") Integer id, @PathVariable("logId") Integer logId, @Valid @RequestBody SecManTActivityLog o) {
        SecManTUserActivity parent = activityRepository.findOne(id);
        if (parent == null) {
            logger.warn("Parent SecManTUserActivity dengan id [{}] tidak ditemukan", id);
            throw new IllegalStateException();
        }

        SecManTActivityLog a = repository.findOne(logId);
        if (a == null) {
            logger.warn("SecManTActivityLog dengan id [{}] tidak ditemukan", logId);
            throw new IllegalStateException();
        }


        if (!a.getUserActivity().getId().equals(parent.getId())) {
            logger.warn("SecManTActivityLog dengan id [{}] tidak ditemukan", logId);
            throw new IllegalStateException();
        }


        o.updateAttributes(a);
        o.setUserActivity(parent);
        repository.save(o);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{logId}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable("id") Integer id, @PathVariable("logId") Integer logId) {

        SecManTUserActivity parent = activityRepository.findOne(id);
        if (parent == null) {
            logger.warn("Parent SecManTUserActivity dengan id [{}] tidak ditemukan", id);
            throw new IllegalStateException();
        }

        SecManTActivityLog a = repository.findOne(logId);
        if (a == null) {
            logger.warn("SecManTActivityLog dengan id [{}] tidak ditemukan", logId);
            throw new IllegalStateException();
        }

        if (!a.getUserActivity().getId().equals(parent.getId())) {
            logger.warn("SecManTActivityLog dengan id [{}] tidak ditemukan", logId);
            throw new IllegalStateException();
        }


        repository.delete(a);
    }


    @RequestMapping(value = "/", method = RequestMethod.GET)
    @ResponseBody
    public String findAll(@PathVariable Integer id, Pageable pageable) {

        SecManTUserActivity parent = activityRepository.findOne(id);

        Page<SecManTActivityLog> result = repository.findByUserActivity(parent, pageable);

        return new PageJsonWrapper<SecManTActivityLog>(result, SecManTActivityLog.class).toJsonString();
    }
}
