package com.project.jobseek.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.FormLoginConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import com.project.jobseek.company.permission.enums.CompanyEntityPermissions;
import com.project.jobseek.config.filters.AuthenticationFilter;
import com.project.jobseek.role.permission.enums.EntityRolePermission;
import com.project.jobseek.role.permission.template.EnumPermission;
import com.project.jobseek.utils.constants.EntityConstants;

@Configuration
@EnableMethodSecurity
public class SecurityConfig
{
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http , AuthenticationFilter authFilter) throws Exception{
		http.formLogin(FormLoginConfigurer::disable)
			.cors(cors -> cors.configurationSource(corsConfigurationSource()))
			.httpBasic(HttpBasicConfigurer::disable)
			.csrf(CsrfConfigurer::disable)
			.authorizeHttpRequests( authorize ->
			authorize
				.requestMatchers( HttpMethod.POST , "/api/*/users").permitAll()
				.requestMatchers( HttpMethod.POST , "/api/*/companies").hasAuthority(
					EntityConstants.COMPANY + "_" + CompanyEntityPermissions.CAN_CREATE_COMPANY
				)
				.anyRequest().authenticated()
			)
			.addFilterBefore(
				authFilter ,
				UsernamePasswordAuthenticationFilter.class
			)

		;
		return http.build();
	}

	@Bean public CorsConfigurationSource corsConfigurationSource(){
		return request -> {
			CorsConfiguration cors = new CorsConfiguration();
			cors.setAllowedOrigins(java.util.List.of("*"));
			cors.setAllowedMethods(java.util.List.of("GET","POST","PUT","DELETE","OPTIONS"));
			cors.setAllowedHeaders(java.util.List.of("*"));
			return cors;
		};
	}

}
