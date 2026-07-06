package com.project.jobseek.jobentity.dto.response;

import lombok.Data;

import java.util.List;

import com.project.jobseek.jobentity.dto.JobApplyDTO;
import com.project.jobseek.jobentity.dto.JobDTO;
import com.project.jobseek.user.dto.UserDTO;

@Data
public class JobAppliedUserResponse
{
	JobDTO job;
	List<JobApplyDTO> users;
}
