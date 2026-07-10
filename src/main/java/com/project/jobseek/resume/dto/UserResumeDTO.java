package com.project.jobseek.resume.dto;

import lombok.Data;

@Data
public class UserResumeDTO
{
	private Long userId;
	private String firstName;
	private String lastName;
	private String email;
	private String username;
}
