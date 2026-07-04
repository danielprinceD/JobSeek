package com.project.jobseek.department.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.jobseek.department.service.DepartmentService;
import com.project.jobseek.jobentity.dto.JobDTO;
import com.project.jobseek.jobentity.model.JobTable;
import com.project.jobseek.utils.responseutils.JobSeekResponse;

@RequestMapping("/api/v1/departments/{departmentId}")
@RestController
public class DepartmentJobControllerV1
{
	@Autowired private ModelMapper modelMapper;
	@Autowired private DepartmentService departmentService;

	public ResponseEntity<JobSeekResponse> getJobsByDepartmentId(@PathVariable("departmentId") String departmentId){
		Long deptId = Long.parseLong(departmentId);
		if(departmentService.getDepartmentById(deptId) == null)
			return ResponseEntity.status(404).body(JobSeekResponse.of(HttpStatus.NOT_FOUND, "Department ID is Invalid"));

		List<JobTable> jobTables = departmentService.getAllJobsByDepartmentId(deptId);
		List<JobDTO>  jobDTOS = jobTables.stream().map(jobTable -> modelMapper.map( jobTable , JobDTO.class) ).toList();
		return ResponseEntity.status(HttpStatus.OK).body(JobSeekResponse.of(HttpStatus.OK, jobDTOS));
	}

}
