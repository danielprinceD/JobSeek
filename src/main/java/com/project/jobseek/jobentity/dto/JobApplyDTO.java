package com.project.jobseek.jobentity.dto;

import lombok.Data;

import com.project.jobseek.jobentity.enums.JobAppliedStatus;
import com.project.jobseek.user.dto.UserDTO;

@Data
public class JobApplyDTO
{
	Long jobApplyId;
	UserDTO user;
	JobAppliedStatus status;
}
