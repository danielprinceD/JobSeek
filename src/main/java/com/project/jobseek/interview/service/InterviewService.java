package com.project.jobseek.interview.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.jobseek.interview.dto.request.InterviewRequest;
import com.project.jobseek.interview.model.Interview;
import com.project.jobseek.interview.repository.InterviewRepository;
import com.project.jobseek.jobentity.repository.JobApplyRepository;
import com.project.jobseek.user.repository.UserRepository;

@Component
public class InterviewService
{
	@Autowired InterviewRepository interviewRepository;
	@Autowired UserRepository userRepository;
	@Autowired JobApplyRepository jobApplyRepository;

	public List<Interview> getAllInterviewsByJobApplyId(Long jobApplyId){
		return interviewRepository.findAllByJobApplyJobApplyId(jobApplyId);
	}

	public Interview saveInterview(Interview interview , InterviewRequest interviewRequest) {
		interview.setInterviewer( userRepository.getReferenceById(interviewRequest.getInterviewerUserId()) );
		interview.setJobApply( jobApplyRepository.getReferenceById( interviewRequest.getJobApplyId() ) );
		return interviewRepository.save(interview);
	}

}
