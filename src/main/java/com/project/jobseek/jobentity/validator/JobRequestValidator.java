package com.project.jobseek.jobentity.validator;

import java.util.Arrays;
import java.util.Map;
import java.util.Objects;
import com.project.jobseek.jobentity.dto.request.JobRequest;
import com.project.jobseek.jobentity.enums.JobStatus;
import com.project.jobseek.utils.validator.ValidationResult;
import com.project.jobseek.utils.validator.Validator;


public interface JobRequestValidator extends Validator<JobRequest>
{
	static JobRequestValidator isValidStatus(){
		return jobRequest -> {
			if(jobRequest.getJobStatus() == null || jobRequest.getJobStatus().isBlank()){
				return ValidationResult.invalid(
					Map.of("jobStatus", "Job status is required")
				);
			}
			boolean isValid = Arrays.stream(JobStatus.values())
				.anyMatch(status -> {
					System.out.println(status.getStatus());
					return Objects.equals(status.getStatus(), jobRequest.getJobStatus());
				});
			if(isValid){
				return ValidationResult.valid();
			}
			return ValidationResult.invalid(
				Map.of("jobStatus", "Invalid job status")
			);

		};
	}
}