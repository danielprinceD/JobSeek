package com.project.jobseek.jobentity.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.jobseek.jobentity.model.JobTable;
import com.project.jobseek.jobentity.repository.JobRepository;

@Component
public class JobService
{
	@Autowired
	private JobRepository jobRepository;

	public JobTable getJobById(Long jobId)
	{
		return jobRepository.findById(jobId).orElse(null);
	}

	public List<JobTable> getAllJobs(){
		return jobRepository.findAll();
	}

}
