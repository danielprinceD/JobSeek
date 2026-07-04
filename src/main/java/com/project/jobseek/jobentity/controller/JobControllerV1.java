package com.project.jobseek.jobentity.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.jobseek.jobentity.dto.JobDTO;
import com.project.jobseek.jobentity.model.JobTable;
import com.project.jobseek.jobentity.service.JobService;
import com.project.jobseek.utils.responseutils.JobSeekResponse;

@RequestMapping("/api/v1")
@RestController
public class JobControllerV1
{
	@Autowired private JobService jobService;
	@Autowired private ModelMapper modelMapper;

	@GetMapping("/jobs/{jobId}")
	public ResponseEntity<JobSeekResponse> getJobById(@PathVariable("jobId") String jobId)
	{
		Long id = Long.parseLong(jobId);
		JobTable jobTable = jobService.getJobById(id);
		if(jobTable == null)
			return ResponseEntity.status(404).body(JobSeekResponse.of(HttpStatus.NOT_FOUND , "Job ID is Invalid"));

		JobDTO jobDTO = modelMapper.map(jobTable , JobDTO.class);
		return ResponseEntity.status(200).body(JobSeekResponse.of(HttpStatus.OK , jobDTO ));
	}

	@DeleteMapping("/jobs/{jobId}")
	public ResponseEntity<JobSeekResponse> deleteJobById(@PathVariable("jobId") String jobId)
	{
		Long id = Long.parseLong(jobId);
		JobTable jobTable = jobService.getJobById(id);
		if(jobTable == null)
			return ResponseEntity.status(404).body(JobSeekResponse.of(HttpStatus.NOT_FOUND , "Job ID is Invalid"));

		boolean jobDeleteStatus = jobService.deleteJobById(id);
		if(!jobDeleteStatus)
			return ResponseEntity.status(500).body(JobSeekResponse.of(HttpStatus.INTERNAL_SERVER_ERROR , "Job Deletion Failed"));
		return ResponseEntity.status(200).body(JobSeekResponse.of(HttpStatus.OK , "Job Deleted Successfully"));
	}
}
