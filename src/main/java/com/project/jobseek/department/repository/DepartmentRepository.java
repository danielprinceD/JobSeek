package com.project.jobseek.department.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.jobseek.department.model.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long>
{
	List<Department> findAllByCompanyId(Long companyId);
}
