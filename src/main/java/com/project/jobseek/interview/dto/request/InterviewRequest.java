package com.project.jobseek.interview.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class InterviewRequest
{
	@NotNull( message = "Job Apply Id is required" )
	private Long jobApplyId;

	private String interviewDateTime;
	private String interviewLocation;
	private String interviewMode;
	private String interviewStatus;
	@NotNull( message = "Interviewer User Id is required" )
	private Long interviewerUserId;
}
