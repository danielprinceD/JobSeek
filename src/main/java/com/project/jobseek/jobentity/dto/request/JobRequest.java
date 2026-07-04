package com.project.jobseek.jobentity.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class JobRequest
{
	@NotBlank( message = "Job title is required")
	private String jobTitle;
	private String jobDescription;
	@NotBlank( message = "Job location is required")
	private String jobLocation;
	private String jobStatus;
}
