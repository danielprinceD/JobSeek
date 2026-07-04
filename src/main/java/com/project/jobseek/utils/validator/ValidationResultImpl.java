package com.project.jobseek.utils.validator;

import java.util.Map;
import java.util.Optional;

public class ValidationResultImpl implements ValidationResult
{

	private final boolean valid;
	private final Map<String, String> errors;

	public ValidationResultImpl(boolean valid, Map<String, String> errors)
	{
		this.valid = valid;
		this.errors = errors;
	}

	@Override
	public boolean isValid()
	{
		return valid;
	}

	@Override
	public Optional<Map<String, String>> getErrors()
	{
		return Optional.ofNullable(errors);
	}

	@Override
	public ValidationResult and(ValidationResult other)
	{
		if (!this.isValid())
		{
			return this;
		}
		return other;
	}

	@Override
	public ValidationResult or(ValidationResult other)
	{
		if (this.isValid())
		{
			return this;
		}
		return other;
	}
}
