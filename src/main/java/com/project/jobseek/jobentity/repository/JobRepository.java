package com.project.jobseek.jobentity.repository;


import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.project.jobseek.jobentity.model.JobTable;

@Component
public interface JobRepository extends JpaRepository<JobTable , Long>
{
	List<JobTable> findAllByJobTableDepartmentId(Long departmentId);
}
