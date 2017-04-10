package id.go.depdagri.adminduk.listener;

import id.go.depdagri.adminduk.api.domain.security.SecManTUserActivity;
import id.go.depdagri.adminduk.api.repository.security.UserActivityRepository;
import java.io.IOException;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

@Component("customLogoutSuccessHandler")
public class CustomLogoutSuccessHandler implements LogoutSuccessHandler {

    @Autowired
    private UserActivityRepository userActivityRepository;

    @Override
    public void onLogoutSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {

        if (httpServletRequest.getSession().getAttribute("userActivity") instanceof SecManTUserActivity) {
            SecManTUserActivity userActivity = (SecManTUserActivity) httpServletRequest.getSession().getAttribute("userActivity");
            userActivity.setLogoutTime(new Date());

            userActivityRepository.save(userActivity);
        }


        httpServletRequest.getSession().invalidate();
        httpServletResponse.sendRedirect(httpServletRequest.getContextPath() + "/loginpage");
    }
}
