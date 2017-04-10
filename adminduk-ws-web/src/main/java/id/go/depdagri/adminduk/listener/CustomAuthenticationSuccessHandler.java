package id.go.depdagri.adminduk.listener;

import id.go.depdagri.adminduk.api.domain.security.SecManMUser;
import id.go.depdagri.adminduk.api.domain.security.SecManTUserActivity;
import id.go.depdagri.adminduk.api.repository.security.UserActivityRepository;
import java.io.IOException;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component("customAuthenticationSuccessHandler")
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    @Autowired
    private UserActivityRepository userActivityRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {

        if (authentication.getPrincipal() instanceof SecManMUser) {
            SecManTUserActivity userActivity = new SecManTUserActivity();
            userActivity.setUser((SecManMUser) authentication.getPrincipal());
            userActivity.setLoginTime(new Date());

            userActivityRepository.save(userActivity);
            httpServletRequest.getSession().setAttribute("userActivity", userActivity);
        }


        httpServletResponse.sendRedirect(httpServletRequest.getContextPath() + "/");
    }
}
