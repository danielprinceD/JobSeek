package com.project.jobseek.jobentity.controller;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.jobseek.jobentity.dto.JobApplyDTO;
import com.project.jobseek.jobentity.dto.JobDTO;
import com.project.jobseek.jobentity.dto.response.JobAppliedUserResponse;
import com.project.jobseek.jobentity.enums.JobAppliedStatus;
import com.project.jobseek.jobentity.model.JobApply;
import com.project.jobseek.jobentity.service.JobService;
import com.project.jobseek.user.dto.UserDTO;
import com.project.jobseek.utils.responseutils.JobSeekResponse;

@RequestMapping("/api/v1")
@RestController
public class JobApplyControllerV1
{
	@Autowired private JobService jobService;
	@Autowired private ModelMapper modelMapper;

	@GetMapping("/jobs/{jobId}/users")
	public ResponseEntity<? extends JobSeekResponse<?>> getJobsAppliedByJobId(@PathVariable("jobId") String jobId){
		Long jobIdLong = Long.parseLong(jobId);
		List<JobApply> jobApplyList = jobService.getJobAppliedByJobId(jobIdLong);
		JobAppliedUserResponse jobAppliedUserResponse = new JobAppliedUserResponse();
		List<JobApplyDTO> jobApplyDTOS = jobApplyList.stream().map(jobApply -> {
			if(jobAppliedUserResponse.getJob() == null)
				jobAppliedUserResponse.setJob(modelMapper.map(jobApply.getJob() , JobDTO.class));
			return modelMapper.map(jobApply , JobApplyDTO.class);
		}).toList();
		jobAppliedUserResponse.setUsers(jobApplyDTOS);
		return JobSeekResponse.withResponseEntity(HttpStatus.OK, jobAppliedUserResponse );
	}

	@PostMapping("/jobs/{jobId}/users/{userId}")
	public ResponseEntity<? extends JobSeekResponse<?>> applyJobByUserId(@PathVariable("jobId") String jobId , @PathVariable("userId") String userId){
		Long jobIdLong = Long.parseLong(jobId);
		Long userIdLong = Long.parseLong(userId);
		JobApply savedJobApply = jobService.saveJobApply(jobIdLong , userIdLong, JobAppliedStatus.APPLIED);
		if(savedJobApply == null)
			return JobSeekResponse.withResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR, "Job Application Failed");

		JobApplyDTO jobApplyDTO = modelMapper.map( savedJobApply ,  JobApplyDTO.class );

		return JobSeekResponse.withResponseEntity(HttpStatus.CREATED, jobApplyDTO);
	}
}
