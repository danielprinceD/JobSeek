package com.project.jobseek.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.project.jobseek.config.filters.AuthenticationFilter;

@Configuration
public class SecurityConfig
{
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http , AuthenticationFilter authFilter) throws Exception{
		http.authorizeHttpRequests( authorize ->
			authorize.requestMatchers( HttpMethod.POST , "/api/*/users").permitAll()
				.anyRequest().authenticated()

		)
			.formLogin(Customizer.withDefaults())
			.httpBasic(Customizer.withDefaults())
			.csrf(CsrfConfigurer::disable)
			.addFilterBefore(
				authFilter ,
				UsernamePasswordAuthenticationFilter.class
			)

		;
		return http.build();
	}

}
