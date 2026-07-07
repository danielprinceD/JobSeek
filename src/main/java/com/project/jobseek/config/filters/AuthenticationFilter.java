package com.project.jobseek.config.filters;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.project.jobseek.user.model.User;
import com.project.jobseek.user.service.UserService;

@Component
public class AuthenticationFilter extends OncePerRequestFilter
{
	@Autowired private UserService userService;
	@Override protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException
	{
		String userIdInString = request.getHeader("userId");
		Long userId = Long.valueOf(userIdInString == null || userIdInString.isEmpty() ? "-1" : userIdInString);

		User user = userService.getUserById(userId);
		if( user == null)
		{
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
			return;
		}

		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
			user , null , List.of()
		);

		SecurityContextHolder.getContext().setAuthentication(authentication);
		try{
			filterChain.doFilter(request, response);
		}
		finally
		{
			SecurityContextHolder.clearContext();
		}


	}
}
