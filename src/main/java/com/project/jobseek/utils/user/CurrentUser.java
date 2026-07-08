package com.project.jobseek.utils.user;

import java.util.List;
import java.util.Objects;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import com.project.jobseek.user.model.User;

public class CurrentUser
{
	public static User get(){
		return (User) Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getPrincipal();
	}
}
