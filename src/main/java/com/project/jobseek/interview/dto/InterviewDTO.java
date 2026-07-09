package com.project.jobseek.interview.dto;
import lombok.Data;

import java.time.LocalDateTime;
import com.project.jobseek.jobentity.model.JobApply;
import com.project.jobseek.user.model.User;

@Data
public class InterviewDTO
{
	private Long interviewId;
	private JobApply jobApply;
	private LocalDateTime interviewDateTime;
	private String interviewLocation;
	private String interviewMode;
	private String interviewStatus;
	private User interviewer;
}
