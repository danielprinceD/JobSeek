package com.project.jobseek.interview.validator;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

import com.project.jobseek.interview.dto.request.InterviewRequest;
import com.project.jobseek.interview.enums.InterviewMode;
import com.project.jobseek.interview.enums.InterviewStatus;
import com.project.jobseek.utils.validator.ValidationResult;
import com.project.jobseek.utils.validator.Validator;

public interface InterviewValidator extends Validator<InterviewRequest>
{
	public static InterviewValidator validateInterviewStatus(){
		return interview -> {

			if(interview.getInterviewStatus() == null)
				return ValidationResult.invalid(Map.of("interviewStatus", "Interview status cannot be null"));

			if(Arrays.stream(InterviewStatus.values()).noneMatch(interviewStatus -> Objects.equals( interviewStatus.name() , interview.getInterviewStatus())))
				return ValidationResult.invalid(Map.of("interviewStatus", "Invalid interview status"));

			return ValidationResult.valid();
		};
	}
	public static InterviewValidator validateInterviewMode(){

		return interview -> {
			if(interview.getInterviewMode() == null)
				return ValidationResult.invalid(Map.of("interviewMode", "Interview mode cannot be null"));
			if(Arrays.stream(InterviewMode.values()).noneMatch(interviewMode -> Objects.equals( interviewMode.name() , interview.getInterviewMode() ) ))
				return ValidationResult.invalid(Map.of("interviewMode", "Invalid interview mode"));
			return ValidationResult.valid();
		};
	}
	public static InterviewValidator isInterviewDataTimeGreaterThanCurrentDateTime(){
		return interview -> {
			if(interview.getInterviewDateTime() == null)
				return ValidationResult.invalid(Map.of("interviewDateTime", "Interview date time cannot be null"));
			if(interview.getInterviewDateTime().isEmpty())
				return ValidationResult.invalid(Map.of("interviewDateTime", "Interview date time cannot be empty"));

			if(LocalDateTime.parse(interview.getInterviewDateTime()).isBefore(LocalDateTime.now()))
				return ValidationResult.invalid(Map.of("interviewDateTime", "Interview date time must be greater than current date time"));

			return ValidationResult.valid();
		};
	}

}
