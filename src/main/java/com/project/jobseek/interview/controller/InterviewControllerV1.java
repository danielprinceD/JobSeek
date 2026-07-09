package com.project.jobseek.interview.controller;

import jakarta.validation.Valid;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.jobseek.interview.dto.InterviewDTO;
import com.project.jobseek.interview.dto.request.InterviewRequest;
import com.project.jobseek.interview.enums.InterviewStatus;
import com.project.jobseek.interview.model.Interview;
import com.project.jobseek.interview.service.InterviewService;
import com.project.jobseek.interview.validator.InterviewValidator;
import com.project.jobseek.utils.responseutils.JobSeekResponse;
import com.project.jobseek.utils.validator.ValidationResult;

@RequestMapping("/api/v1")
@RestController
public class InterviewControllerV1
{
	@Autowired InterviewService interviewService;
	@Autowired ModelMapper modelMapper;

	@GetMapping("/interviews")
	public ResponseEntity<? extends JobSeekResponse<?>> getAllInterviewsByJobApplyId(@RequestParam("job_apply_id") String jobApplyIdStr )
	{
		Long jobApplyId = Long.parseLong(jobApplyIdStr);

		List<InterviewDTO> interviews = interviewService.getAllInterviewsByJobApplyId(jobApplyId).stream()
			.map( interview -> modelMapper.map(interview , InterviewDTO.class) ).collect(Collectors.toList());

		return JobSeekResponse.withResponseEntity(HttpStatus.OK , interviews);

	}

	@PostMapping("/interviews")
	public ResponseEntity<? extends JobSeekResponse<?>> createInterview(@Valid @RequestBody InterviewRequest interviewRequest){

		ValidationResult interviewValidation = InterviewValidator.validateInterviewMode()
			.apply(interviewRequest);

		if(!interviewValidation.isValid())
			return JobSeekResponse.withResponseEntity(HttpStatus.BAD_REQUEST , interviewValidation.getErrors());

		Interview interview = modelMapper.map(interviewRequest , Interview.class);
		interview.setInterviewStatus(InterviewStatus.SCHEDULED);
		Interview savedInterview = interviewService.saveInterview(interview , interviewRequest);
		InterviewDTO interviewDTO = modelMapper.map(savedInterview , InterviewDTO.class);
		return JobSeekResponse.withResponseEntity(HttpStatus.CREATED , interviewDTO);
	}

}
