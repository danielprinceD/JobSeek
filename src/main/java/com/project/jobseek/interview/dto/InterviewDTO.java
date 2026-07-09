package com.project.jobseek.interview.dto;
import lombok.Data;

import java.time.LocalDateTime;

import com.project.jobseek.jobentity.dto.JobApplyDTO;
import com.project.jobseek.jobentity.model.JobApply;
import com.project.jobseek.user.dto.UserDTO;
import com.project.jobseek.user.model.User;

@Data
public class InterviewDTO
{
	private Long interviewId;
	private JobApplyDTO jobApply;
	private LocalDateTime interviewDateTime;
	private String interviewLocation;
	private String interviewMode;
	private String interviewStatus;
	private UserDTO interviewer;
}
