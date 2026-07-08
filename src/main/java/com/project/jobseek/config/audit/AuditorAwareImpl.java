package com.project.jobseek.config.audit;

import lombok.NonNull;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.project.jobseek.user.model.User;
import com.project.jobseek.utils.user.CurrentUser;

@Component
public class AuditorAwareImpl implements AuditorAware<User>
{

	@Override
	public Optional<User> getCurrentAuditor() {
		return Optional.of(CurrentUser.get());
	}
}