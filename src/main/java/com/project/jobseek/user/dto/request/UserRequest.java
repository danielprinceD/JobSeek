package com.project.jobseek.user.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserRequest
{
	@NotBlank(message = "Username is required")
	String username;
	@NotBlank( message = "First name is required" )
	private String firstName;
	private String lastName;
	@NotBlank(message = "Email is required")
	@Email( message = "Email should be valid" )
	private String email;
	@NotNull( message = "Role is required" )
	private Long roleId;
}
