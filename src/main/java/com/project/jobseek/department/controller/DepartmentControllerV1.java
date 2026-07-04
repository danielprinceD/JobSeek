package com.project.jobseek.department.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.jobseek.company.dto.request.CompanyDepartmentRequest;
import com.project.jobseek.department.dto.DepartmentDTO;
import com.project.jobseek.department.model.Department;
import com.project.jobseek.department.service.DepartmentService;
import com.project.jobseek.utils.responseutils.JobSeekResponse;

@RequestMapping("/api/v1")
@RestController
public class DepartmentControllerV1
{
	@Autowired private DepartmentService departmentService;

	@Autowired private ModelMapper modelMapper;

	@PutMapping("/departments/{departmentId}")
	public ResponseEntity<JobSeekResponse> updateDepartment( @PathVariable("departmentId") String departmentId , @RequestBody CompanyDepartmentRequest departmentDTO){
		Long deptId = Long.parseLong(departmentId);
		Department department = departmentService.getDepartmentById(deptId);
		if(department == null)
			return ResponseEntity.status(404).body(JobSeekResponse.of(HttpStatus.NOT_FOUND , "Department ID is Invalid"));

		modelMapper.map( departmentDTO , department );
		Department updateDepartment = departmentService.updateDepartment(department);
		DepartmentDTO updatedDepartmentDTO = modelMapper.map(updateDepartment , DepartmentDTO.class);
		return ResponseEntity.status(HttpStatus.OK).body(JobSeekResponse.of(HttpStatus.OK , updatedDepartmentDTO));
	}

	@DeleteMapping("/departments/{departmentId}")
	public ResponseEntity<JobSeekResponse> deleteDepartment(@PathVariable("departmentId") String departmentId){
		Long deptId = Long.parseLong(departmentId);
		Department department = departmentService.getDepartmentById(deptId);
		if(department == null)
			return ResponseEntity.status(404).body(JobSeekResponse.of(HttpStatus.NOT_FOUND , "Department ID is Invalid"));

		departmentService.deleteDepartment(deptId);
		return ResponseEntity.status(HttpStatus.OK).body(JobSeekResponse.of(HttpStatus.OK , "Department Deleted Successfully"));
	}
}
