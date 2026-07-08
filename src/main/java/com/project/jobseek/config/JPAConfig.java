package com.project.jobseek.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.project.jobseek.config.audit.AuditorAwareImpl;

@Configuration
@EnableJpaAuditing( auditorAwareRef = "auditorProvider")
public class JPAConfig
{
	@Bean
	public AuditorAwareImpl auditorProvider() {
		return new AuditorAwareImpl();
	}
}
