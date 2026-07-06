package com.project.jobseek.jobentity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.project.jobseek.jobentity.model.JobApply;

@Component
public interface JobApplyRepository extends JpaRepository<JobApply , Long>{
	public List<JobApply> findByJobJobId(Long jobId);
	public List<JobApply> findByJobJobIdAndUserUserId(Long jobId , Long userId);
}
