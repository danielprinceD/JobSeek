package com.project.jobseek.interview.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.project.jobseek.interview.model.Interview;

@Component
public interface InterviewRepository extends JpaRepository<Interview , Long>
{
	public List<Interview> findAllByJobApplyJobApplyId(Long jobApplyId);

}
