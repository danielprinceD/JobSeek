package com.project.jobseek.jobentity.dto;

import lombok.Data;

@Data
public class JobDTO
{
	private Long jobId;
	private String jobTitle;
	private String jobDescription;
	private String jobLocation;
}
