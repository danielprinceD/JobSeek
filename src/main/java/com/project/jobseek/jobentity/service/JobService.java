package com.project.jobseek.jobentity.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.jobseek.jobentity.model.JobTable;
import com.project.jobseek.jobentity.repository.JobRepository;

@Component
public class JobService
{
	@Autowired private JobRepository jobRepository;
	@Autowired private ModelMapper modelMapper;

	public JobTable getJobById(Long jobId)
	{
		return jobRepository.findById(jobId).orElse(null);
	}

	public List<JobTable> getAllJobs(){
		return jobRepository.findAll();
	}

	public boolean deleteJobById(Long jobId)
	{
		if(jobRepository.existsById(jobId))
		{
			jobRepository.deleteById(jobId);
			return true;
		}
		return false;
	}

	public JobTable updateJobById(Long jobId , JobTable jobTable){
		JobTable existingJob = jobRepository.findById(jobId).orElse(null);
		if(existingJob == null)
			return null;
		modelMapper.map(jobTable , existingJob);
		existingJob.setJobId(jobId);
		return jobRepository.save(existingJob);
	}


}
