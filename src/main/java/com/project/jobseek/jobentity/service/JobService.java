package com.project.jobseek.jobentity.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.jobseek.jobentity.enums.JobAppliedStatus;
import com.project.jobseek.jobentity.model.JobApply;
import com.project.jobseek.jobentity.model.JobTable;
import com.project.jobseek.jobentity.repository.JobApplyRepository;
import com.project.jobseek.jobentity.repository.JobRepository;
import com.project.jobseek.user.model.User;
import com.project.jobseek.user.repository.UserRepository;

@Component
public class JobService
{
	@Autowired private JobRepository jobRepository;
	@Autowired private JobApplyRepository jobApplyRepository;
	@Autowired private UserRepository userRepository;

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
		return saveJob(existingJob);
	}

	public JobTable saveJob(JobTable job){
		return jobRepository.save(job);
	}

	public List<JobApply> getJobAppliedByJobId(Long jobId){
		return jobApplyRepository.findByJobJobId(jobId);
	}

	public JobApply saveJobApply(Long jobId , Long userId , JobAppliedStatus status){
		JobTable job = jobRepository.findById(jobId).orElse(null);
		User user = userRepository.findById(userId).orElse(null);

		if(job == null || user == null){
			return null;
		}

		List<JobApply> jobApplyList = jobApplyRepository.findByJobJobIdAndUserUserId(jobId , userId);
		if(!jobApplyList.isEmpty()){
			return null;
		}

		JobApply jobApply = new JobApply();
		jobApply.setJob(job);
		jobApply.setUser(user);
		jobApply.setStatus(status.getStatus());
		return jobApplyRepository.save(jobApply);
	}
	public List<JobApply> updateJobApplyStatus(List<Long> jobApplyIds , JobAppliedStatus status){
		List<JobApply> jobApplyList = jobApplyRepository.findAllById(jobApplyIds);
		if(jobApplyList.isEmpty()){
			return List.of();
		}
		jobApplyList.forEach(jobApply -> {
			jobApply.setStatus(status.getStatus());
		});
		return jobApplyRepository.saveAll(jobApplyList);
	}
}
