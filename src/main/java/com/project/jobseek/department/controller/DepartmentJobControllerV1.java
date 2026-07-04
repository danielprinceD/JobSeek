package com.project.jobseek.department.controller;

import jakarta.validation.Valid;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.jobseek.department.model.Department;
import com.project.jobseek.department.service.DepartmentService;
import com.project.jobseek.jobentity.dto.JobDTO;
import com.project.jobseek.jobentity.dto.request.JobRequest;
import com.project.jobseek.jobentity.model.JobTable;
import com.project.jobseek.jobentity.service.JobService;
import com.project.jobseek.jobentity.validator.JobRequestValidator;
import com.project.jobseek.utils.responseutils.JobSeekResponse;
import com.project.jobseek.utils.validator.ValidationResult;

@RequestMapping("/api/v1/departments/{departmentId}")
@RestController
public class DepartmentJobControllerV1
{
	@Autowired private ModelMapper modelMapper;
	@Autowired private DepartmentService departmentService;
	@Autowired private JobService jobService;

	@GetMapping("/jobs")
	public ResponseEntity<JobSeekResponse> getJobsByDepartmentId(@PathVariable("departmentId") String departmentId){
		Long deptId = Long.parseLong(departmentId);
		if(departmentService.getDepartmentById(deptId) == null)
			return ResponseEntity.status(404).body(JobSeekResponse.of(HttpStatus.NOT_FOUND, "Department ID is Invalid"));

		List<JobTable> jobTables = departmentService.getAllJobsByDepartmentId(deptId);
		List<JobDTO>  jobDTOS = jobTables.stream().map(jobTable -> modelMapper.map( jobTable , JobDTO.class) ).toList();
		return ResponseEntity.status(HttpStatus.OK).body(JobSeekResponse.of(HttpStatus.OK, jobDTOS));
	}

	@PostMapping("/jobs")
	public ResponseEntity<JobSeekResponse> saveJobsByDepartmentId(@PathVariable("departmentId") String departmentId , @Valid @RequestBody JobRequest jobRequest){
		Long deptId = Long.parseLong(departmentId);
		Department department = departmentService.getDepartmentById(deptId);
		if(department == null)
			return ResponseEntity.status(404).body(JobSeekResponse.of(HttpStatus.NOT_FOUND, "Department ID is Invalid"));

		ValidationResult jobRequestValidationResult = JobRequestValidator.isValidStatus().apply(jobRequest);
		if(!jobRequestValidationResult.isValid()){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(JobSeekResponse.of(HttpStatus.BAD_REQUEST, jobRequestValidationResult.getErrors()));
		}
		JobTable savedJob = modelMapper.map(jobRequest , JobTable.class);
		savedJob.setDepartment(department);
		savedJob = jobService.saveJob(savedJob);
		JobDTO savedJobDTO = modelMapper.map(savedJob , JobDTO.class);
		return ResponseEntity.status(HttpStatus.CREATED).body(JobSeekResponse.of(HttpStatus.CREATED, savedJobDTO));
	}


}
