package com.project.jobseek.interview.service;
import java.util.function.Consumer;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.jobseek.interview.dto.request.InterviewRequest;
import com.project.jobseek.interview.model.Interview;
import com.project.jobseek.interview.repository.InterviewRepository;
import com.project.jobseek.jobentity.model.JobApply;
import com.project.jobseek.jobentity.repository.JobApplyRepository;
import com.project.jobseek.user.repository.UserRepository;

@Component
public class InterviewService
{
	@Autowired InterviewRepository interviewRepository;
	@Autowired UserRepository userRepository;
	@Autowired JobApplyRepository jobApplyRepository;
	@Autowired ModelMapper modelMapper;

	public Interview getInterviewsByJobApplyId(Long jobApplyId){
		return interviewRepository.findAllByJobApplyJobApplyId(jobApplyId).stream().findFirst().orElse(null);
	}

	public Interview saveInterview(Interview interview , InterviewRequest interviewRequest , Consumer<JobApply> jobApplyCustomizer ) {
		interview.setInterviewer( userRepository.getReferenceById(interviewRequest.getInterviewerUserId()) );
		JobApply jobApply = jobApplyRepository.findById(interviewRequest.getJobApplyId()).orElseThrow(()-> new RuntimeException("JobApply not found with id: " + interviewRequest.getJobApplyId()));
		jobApplyCustomizer.accept(jobApply);
		interview.setJobApply( jobApplyRepository.getReferenceById( interviewRequest.getJobApplyId()));

		return interviewRepository.save(interview);
	}

	public Interview updateInterview(Interview interview , InterviewRequest interviewRequest) {
		Interview existingInterview = interviewRepository.findById(interview.getInterviewId()).orElseThrow(()-> new RuntimeException("Interview not found with id: " + interview.getInterviewId()));
		modelMapper.map( interview , existingInterview );
		return saveInterview( existingInterview , interviewRequest  , j -> {} );

	}

}
