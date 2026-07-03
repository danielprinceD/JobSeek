package com.project.jobseek.department.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.jobseek.department.model.Department;
import com.project.jobseek.department.repository.DepartmentRepository;

@Service
public class DepartmentService
{

	@Autowired
	private DepartmentRepository departmentRepository;

	List<Department> getAllDepartmentByCompanyId(Long companyId)
	{
		return departmentRepository.findAllByCompanyCompanyId(companyId);
	}
}
