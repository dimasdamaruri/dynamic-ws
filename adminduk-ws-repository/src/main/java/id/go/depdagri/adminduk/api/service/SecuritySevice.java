package id.go.depdagri.adminduk.api.service;

import id.go.depdagri.adminduk.api.repository.security.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service(value = "securityService")
public class SecuritySevice implements UserDetailsService {
/*------------------------------ Fields ------------------------------*/

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException, DataAccessException {
        try {
            UserDetails o = userRepository.findByUsername(s);
            if (o != null) {
                return o;
            } else {
                throw new UsernameNotFoundException("User Not Found");
            }
        } catch (Exception x) {
            throw new UsernameNotFoundException(x.getMessage());
        }
    }
}
