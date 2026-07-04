package com.project.jobseek.utils.validator;

import java.util.Map;
import java.util.Optional;

public interface ValidationResult
{
	boolean isValid();
	Optional<Map<String, String>> getErrors();
	ValidationResult and(ValidationResult other);
	ValidationResult or(ValidationResult other);

	static ValidationResult valid()
	{
		return new ValidationResultImpl(true, null);
	}

	static ValidationResult invalid(Map<String, String> errors)
	{
		return new ValidationResultImpl(false, errors);
	}
}
