package com.project.jobseek.jobentity.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.jobseek.jobentity.dto.JobApplyDTO;
import com.project.jobseek.jobentity.dto.JobDTO;
import com.project.jobseek.jobentity.dto.request.JobApplyRequest;
import com.project.jobseek.jobentity.dto.response.JobAppliedUserResponse;
import com.project.jobseek.jobentity.enums.JobAppliedStatus;
import com.project.jobseek.jobentity.model.JobApply;
import com.project.jobseek.jobentity.service.JobService;
import com.project.jobseek.jobentity.validator.JobApplyRequestValidator;
import com.project.jobseek.user.dto.UserDTO;
import com.project.jobseek.utils.responseutils.JobSeekResponse;
import com.project.jobseek.utils.validator.ValidationResult;

@RequestMapping("/api/v1")
@RestController
public class JobApplyControllerV1
{
	@Autowired private JobService jobService;
	@Autowired private ModelMapper modelMapper;

	@GetMapping("/jobs/{jobId}/apply")
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

	@PostMapping("/jobs/{jobId}/apply/{userId}")
	public ResponseEntity<? extends JobSeekResponse<?>> applyJobByUserId(@PathVariable("jobId") String jobId , @PathVariable("userId") String userId){
		Long jobIdLong = Long.parseLong(jobId);
		Long userIdLong = Long.parseLong(userId);
		JobApply savedJobApply = jobService.saveJobApply(jobIdLong , userIdLong, JobAppliedStatus.APPLIED);
		if(savedJobApply == null)
			return JobSeekResponse.withResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR, "Job Application Failed");

		JobApplyDTO jobApplyDTO = modelMapper.map( savedJobApply ,  JobApplyDTO.class );

		return JobSeekResponse.withResponseEntity(HttpStatus.CREATED, jobApplyDTO);
	}
	@PutMapping("/jobapply")
	public ResponseEntity< ? extends JobSeekResponse<?>> updateJobApplyStatus(@RequestParam("jobapplyids") List<String> jobApplyIds , @RequestParam("status") String statusCode){
		List<Long> jobApplyIdsParsed = jobApplyIds.stream().map(Long::parseLong).toList();
		int parsedStatusCode = Integer.parseInt(statusCode);
		JobApplyRequest jobApply = new JobApplyRequest();
		jobApply.setStatus(parsedStatusCode);
		ValidationResult validationResult = JobApplyRequestValidator.isValidStatus().apply(jobApply);
		if(!validationResult.isValid())
			return JobSeekResponse.withResponseEntity(HttpStatus.BAD_REQUEST, validationResult.getErrors());
		JobAppliedStatus jobAppliedStatus = JobAppliedStatus.fromStatusCode(parsedStatusCode);
		List<JobApplyDTO> updatedJobApplyList = jobService.updateJobApplyStatus(jobApplyIdsParsed , jobAppliedStatus ).stream().map(
			updateJobApply -> modelMapper.map(updateJobApply , JobApplyDTO.class)
		).toList();
		if(updatedJobApplyList.isEmpty())
			return JobSeekResponse.withResponseEntity(HttpStatus.NOT_FOUND, "No Job Apply Found");
		return JobSeekResponse.withResponseEntity(HttpStatus.OK, updatedJobApplyList);
	}
	@DeleteMapping("/jobs/{jobId}/apply")
	public ResponseEntity<? extends JobSeekResponse<?>> deleteJobApplyByJobId(@PathVariable("jobId") String jobId){
		Long jobIdLong = Long.parseLong(jobId);
		boolean isDeleted = jobService.deleteJobApplyByJobId(jobIdLong);
		if(isDeleted)
			return JobSeekResponse.withResponseEntity(HttpStatus.OK, "Job Apply Deleted Successfully");
		return JobSeekResponse.withResponseEntity(HttpStatus.NOT_FOUND, "No Job Apply Found");
	}
}
