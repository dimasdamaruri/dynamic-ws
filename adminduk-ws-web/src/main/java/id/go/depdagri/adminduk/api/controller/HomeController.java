package id.go.depdagri.adminduk.api.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {
    
    private final Logger LOGGER = LoggerFactory.getLogger(HomeController.class);

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String home(ModelMap modelMap) {
        LOGGER.info("USER AKSES URL HOME");
        return "home";
    }

    @RequestMapping(value = "/loginpage", method = RequestMethod.GET)
    public String loginPage(ModelMap modelMap) {
        LOGGER.info("USER AKSES URL LOGIN PAGE");
        return "loginpage";
    }

}
