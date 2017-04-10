package id.go.depdagri.adminduk.api.controller.base;

import id.go.depdagri.adminduk.api.domain.security.SecManMUser;
import id.go.depdagri.adminduk.api.domain.security.SecManTActivityLog;
import id.go.depdagri.adminduk.api.domain.security.SecManTUserActivity;
import id.go.depdagri.adminduk.api.repository.security.ActivityLogRepository;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;

public abstract class BaseLogHelper extends BaseExceptionHandler {

    @Autowired
    protected ActivityLogRepository activityLogRepository;

    protected void addLogForAction(HttpServletRequest request, String action) {
        if (request.getSession().getAttribute("userActivity") instanceof SecManTUserActivity) {
            SecManTUserActivity userActivity = (SecManTUserActivity) request.getSession().getAttribute("userActivity");

            SecManTActivityLog activityLog = new SecManTActivityLog();
            activityLog.setUserActivity(userActivity);
            activityLog.setUserAction(action);

            activityLogRepository.save(activityLog);
        }
    }

    protected SecManMUser getLoggedUser() {
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof SecManMUser) {
            return (SecManMUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        } else {
            return null;
        }
    }

}
