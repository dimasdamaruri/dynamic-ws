package id.go.depdagri.adminduk.filter;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JsonpCallbackFilter implements Filter {

    private static Log log = LogFactory.getLog(JsonpCallbackFilter.class);
    private static String JSON_MIME_TYPE = "application/json";
    private static String JAVASCRIPT_MIME_TYPE = "application/javascript";

    public void init(FilterConfig fConfig) throws ServletException {
    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        httpResponse.setHeader("Access-Control-Allow-Origin", "*");
        httpResponse.setHeader("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        httpResponse.setHeader("Access-Control-Allow-Headers", "origin, x-requested-with, content-type");

//
//        @SuppressWarnings("unchecked")
//        Map<String, String[]> parms = httpRequest.getParameterMap();
//
//        String accept = httpRequest.getHeader("Accept");
//
////        if (parms.containsKey("callback") && (accept.indexOf(JSON_MIME_TYPE) >= 0 || accept.indexOf(JAVASCRIPT_MIME_TYPE) >=0 )) {
//        if (parms.containsKey("callback")) {
//            if (log.isDebugEnabled())
//                log.debug("Wrapping response with JSONP callback '" + parms.get("callback")[0] + "'");
//
//            OutputStream out = httpResponse.getOutputStream();
//
//            GenericResponseWrapper wrapper = new GenericResponseWrapper(httpResponse);
//
//            chain.doFilter(request, wrapper);
//
//            out.write(new String(parms.get("callback")[0] + "(").getBytes());
//            out.write(wrapper.getData());
//            out.write(new String(");").getBytes());
//
//            wrapper.setContentType("text/javascript;charset=UTF-8");
//
//            out.close();
//        } else {
//            chain.doFilter(request, response);
//        }

        chain.doFilter(request, response);
    }

    public void destroy() {
    }
}