package com.project.jobseek.department.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import com.project.jobseek.department.model.Department;

@Component
public interface DepartmentRepository extends JpaRepository<Department, Long>
{
	List<Department> findAllByCompanyCompanyId(Long companyId);
}
