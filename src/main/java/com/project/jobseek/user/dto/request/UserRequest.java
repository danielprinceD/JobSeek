package com.project.jobseek.user.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserRequest
{
	@NotBlank( message = "First name is required" )
	private String firstName;
	private String lastName;
	@NotBlank(message = "Email is required")
	@Email( message = "Email should be valid" )
	private String email;
}
