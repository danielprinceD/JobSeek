package com.project.jobseek.jobentity.validator;

import java.util.Arrays;
import java.util.Map;
import java.util.Objects;

import com.project.jobseek.jobentity.dto.request.JobApplyRequest;
import com.project.jobseek.jobentity.enums.JobAppliedStatus;
import com.project.jobseek.utils.validator.ValidationResult;
import com.project.jobseek.utils.validator.Validator;

public interface JobApplyRequestValidator extends Validator<JobApplyRequest>
{
	public static JobApplyRequestValidator isValidStatus(){
		return jobApply -> {
			if(jobApply.getStatus() == null || jobApply.getStatus() <= 0){
				return ValidationResult.invalid(Map.of(
					"status", "Status is required"
				));
			}
			if(Arrays.stream(JobAppliedStatus.values()).anyMatch(jobAppliedStatus -> jobApply.getStatus().equals(jobAppliedStatus.getStatusCode()))){
				return ValidationResult.valid();
			}
			return ValidationResult.invalid(Map.of(
				"status", "Invalid status"
			));
		};
	}
}
