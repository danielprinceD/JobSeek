package com.project.jobseek.utils.validator;

import java.util.function.Function;

public interface Validator<T> extends Function< T , ValidationResult>
{
	default Validator<T> and(Validator<T> other)
	{
		return t -> {
			ValidationResult result = this.apply(t);
			if (!result.isValid())
			{
				return result;
			}
			return other.apply(t);
		};
	}

	default  Validator<T> or(Validator<T> other)
	{
		return t -> {
			ValidationResult result = this.apply(t);
			if (result.isValid())
			{
				return result;
			}
			return other.apply(t);
		};
	}
}
