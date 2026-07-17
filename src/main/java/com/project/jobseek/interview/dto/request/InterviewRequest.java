package com.project.jobseek.interview.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class InterviewRequest
{
	private Long interviewId;
	@NotNull( message = "Job Apply Id is required" )
	private Long jobApplyId;

	private LocalDateTime interviewDateTime;
	private String interviewLocation;
	private String interviewMode;
	private String interviewStatus;
	@NotNull( message = "Interviewer User Id is required" )
	private Long interviewerUserId;
}
