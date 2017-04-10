package id.go.depdagri.adminduk.api.controller.base;

import id.go.depdagri.adminduk.api.domain.base.Base;
import id.go.depdagri.adminduk.api.wrapper.PageJsonWrapper;
import java.io.Serializable;
import java.net.URI;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.util.UriTemplate;

@SuppressWarnings("unchecked")
public abstract class BaseRestController<D extends Base, K extends Serializable, R extends PagingAndSortingRepository<D, K>> extends BaseLogHelper {
    public abstract R getRepository();

    private Class<D> baseClass;

    protected BaseRestController(Class<D> baseClass) {
        this.baseClass = baseClass;
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@Valid @RequestBody D o, HttpServletRequest request, HttpServletResponse response) {
        getRepository().save(o);

        addLogForAction(request, "Create " + o.toString());

        String requestUrl = request.getRequestURL().toString();
        URI uri = new UriTemplate("{requestUrl}{id}").expand(requestUrl, o.getId());
        response.setHeader("Location", uri.toASCIIString());
    }


    @RequestMapping("/{id}")
    @ResponseBody
    public String findById(@PathVariable K id, HttpServletRequest request, HttpServletResponse response) {
        D o = getRepository().findOne(id);
        if (o == null) {
            throw new IllegalStateException();
        }
        return o.toJsonString();
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable K id, @Valid @RequestBody D a, HttpServletRequest request, HttpServletResponse response) {
        D o = getRepository().findOne(id);

        if (o == null) {
            throw new IllegalStateException();
        }

        String action = "Update from " + o.toString() + " to ";

        a.updateAttributes(o);
        getRepository().save(a);

        action += a.toString();

        addLogForAction(request, action);

        String requestUrl = request.getRequestURL().toString();
        URI uri = new UriTemplate("{requestUrl}{id}").expand(requestUrl, a.getId());
        response.setHeader("Location", uri.toASCIIString());
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable K id, HttpServletRequest request, HttpServletResponse response) {
        D a = getRepository().findOne(id);
        if (a == null) {
            throw new IllegalStateException();
        }

        getRepository().delete(a);

        addLogForAction(request, "Delete " + a.getClass().getName() + "{ id : " + a.getId() + " }");

        String requestUrl = request.getRequestURL().toString();
        URI uri = new UriTemplate("{requestUrl}").expand(requestUrl);
        response.setHeader("Location", uri.toASCIIString());
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    @ResponseBody
    public String findAll(Pageable pageable, HttpServletRequest request, HttpServletResponse response) {
        Page<D> result = getRepository().findAll(pageable);


        contentRangeBuilder(result, response);

        return new PageJsonWrapper<D>(result, baseClass).toJsonString();
    }

    protected void contentRangeBuilder(Page<D> result, HttpServletResponse response) {
        String contentRange = "items ";
        contentRange += (result.getNumber() * result.getSize());
        contentRange += "-" + ((result.getNumber() * result.getSize()) + result.getNumberOfElements());
        contentRange += "/" + result.getTotalElements();
        response.setHeader("Content-Range", contentRange);
    }


}
