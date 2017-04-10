package id.go.depdagri.adminduk;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@PropertySource("classpath:jdbc.properties")
@EnableWebMvc
public class AppConfig extends WebMvcConfigurerAdapter {

    @Value("${jdbc.driver}")
    private String jdbcDriver;
    
    @Value("${jdbc.url}")
    private String jdbcUrl;
    
    @Value("${jdbc.username}")
    private String jdbcUsername;
    
    @Value("${jdbc.password}")
    private String jdbcPassword;
    
    @Value("${jdbc.minIdle}")
    private Integer jdbcMinIdle;
    
    @Value("${jdbc.maxIdle}")
    private Integer jdbcMaxIdle;
    
    @Value("${jdbc.maxActive}")
    private Integer jdbcMaxActive;
    
    @Value("${jdbc.maxWait}")
    private Integer jdbcMaxWait;
    
    @Value("${jdbc.testOnBorrow}")
    private Boolean jdbcTestOnBorrow;
    
    @Value("${jdbc.validationQuery}")
    private String jdbcValidationQuery;
    
    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }
    
    @Bean
    public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
        return new PropertySourcesPlaceholderConfigurer();
    }

    @Bean
    public DataSource dataSource() {
        DataSource tomcatDs = new DataSource();
        
        tomcatDs.setDriverClassName(jdbcDriver);
        tomcatDs.setUrl(jdbcUrl);
        tomcatDs.setUsername(jdbcUsername);
        tomcatDs.setPassword(jdbcPassword);
        tomcatDs.setInitialSize(1);
        tomcatDs.setMinIdle(jdbcMinIdle);
        tomcatDs.setMaxIdle(jdbcMaxIdle);
        tomcatDs.setMaxActive(jdbcMaxActive);
        tomcatDs.setMaxWait(jdbcMaxWait);
        tomcatDs.setTestOnBorrow(jdbcTestOnBorrow);
        tomcatDs.setValidationQuery(jdbcValidationQuery);

        return tomcatDs;
    }
}
