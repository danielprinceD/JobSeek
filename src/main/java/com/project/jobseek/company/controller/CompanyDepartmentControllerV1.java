package com.project.jobseek.company.controller;

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

import com.project.jobseek.company.dto.request.CompanyDepartmentRequest;
import com.project.jobseek.company.model.Company;
import com.project.jobseek.company.service.CompanyService;
import com.project.jobseek.department.dto.DepartmentDTO;
import com.project.jobseek.department.model.Department;
import com.project.jobseek.utils.responseutils.JobSeekResponse;

@RequestMapping("/api/v1/companies/{companyId}")
@RestController
public class CompanyDepartmentControllerV1
{
	@Autowired
	private CompanyService companyService;

	@Autowired
	private ModelMapper modelMapper;

	@GetMapping("/departments")
	public ResponseEntity<JobSeekResponse<List<DepartmentDTO>>> getCompanyDepartments(@PathVariable ("companyId") String companyId){
		Long id = Long.parseLong(companyId);
		List<Department> departments =  companyService.getAllDepartmentByCompanyId(id);
		List<DepartmentDTO> departmentDTOS = departments.stream().map(department ->
			modelMapper.map(department , DepartmentDTO.class)
		).toList();
		return ResponseEntity.ok().body(JobSeekResponse.of(HttpStatus.OK, departmentDTOS));
	}

	@PostMapping("/departments")
	public ResponseEntity<JobSeekResponse> createDepartment(@PathVariable ("companyId") String companyId , @RequestBody CompanyDepartmentRequest departmentRequest){
		Long id = Long.parseLong(companyId);
		Department department = modelMapper.map(departmentRequest , Department.class);
		Company company = companyService.getCompanyById(companyId);
		if(company == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(JobSeekResponse.of(HttpStatus.NOT_FOUND, "Company ID is Invalid"));
		department.setCompany(company);
		Department savedDepartment = companyService.saveDepartment(department);
		DepartmentDTO departmentDTO = modelMapper.map(savedDepartment , DepartmentDTO.class);
		return ResponseEntity.status(HttpStatus.CREATED).body(JobSeekResponse.of(HttpStatus.CREATED, departmentDTO));
	}
}
