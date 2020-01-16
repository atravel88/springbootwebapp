package ru.atavrel.springbootapp.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private UserDetailsServiceImpl userDetailsService;
    private SuccessHandler successHandler;

    @Autowired
    public void setUserDetailsService(UserDetailsServiceImpl userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Autowired
    public void setSuccessHandler(SuccessHandler successHandler) {
        this.successHandler = successHandler;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.
                authorizeRequests()
                .antMatchers("/resources/**").permitAll()
                .antMatchers("/", "/registration").anonymous()
                .antMatchers("/home/**").hasAuthority("USER")
                .antMatchers("/admin/**").hasAuthority("ADMIN")
                .antMatchers("/manager/**").hasAuthority("MANAGER")
                // auth for admin
                .antMatchers(HttpMethod.GET,  "/api/admin/**").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.POST,  "/api/admin/**").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.PUT,  "/api/admin/**").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.DELETE,  "/api/admin/**").hasAuthority("ADMIN")
                // auth for manager
                .antMatchers(HttpMethod.GET,  "/api/manager/**").hasAuthority("MANAGER")
                // auth for user
                .antMatchers(HttpMethod.GET,  "/api/user/**").hasAuthority("USER")
                // auth for registration
                .antMatchers(HttpMethod.GET,  "/registration/**").anonymous()
                .antMatchers(HttpMethod.POST,  "/registration/**").anonymous()
                //
                .and()
                .formLogin()
                .loginPage("/")
                .usernameParameter("email")
                .successHandler(successHandler);
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(4);
    }
}


