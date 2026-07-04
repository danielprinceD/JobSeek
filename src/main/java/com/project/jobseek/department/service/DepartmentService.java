package com.project.jobseek.department.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.jobseek.department.model.Department;
import com.project.jobseek.department.repository.DepartmentRepository;
import com.project.jobseek.jobentity.model.JobTable;
import com.project.jobseek.jobentity.repository.JobRepository;

@Service
public class DepartmentService
{

	@Autowired private DepartmentRepository departmentRepository;

	@Autowired private JobRepository jobRepository;

	public Department getDepartmentById(Long departmentId){
		return departmentRepository.findById(departmentId).orElse(null);
	}

	public Department updateDepartment(Department department){
		return departmentRepository.save(department);
	}

	public void deleteDepartment(Long departmentId){
		departmentRepository.deleteById(departmentId);
	}

	public List<JobTable> getAllJobsByDepartmentId(Long departmentId){
		return jobRepository.findAllByDepartmentDepartmentId(departmentId);
	}
}
