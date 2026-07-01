package com.project.jobseek.utils.responseutils;

import lombok.Getter;

@Getter
public class JobSeekResponse<T>
{
	private Long code;
	private T result;

	private JobSeekResponse(Long code , T result )
	{
		this.code = code;
		this.result = result;
	}

	public static <T>JobSeekResponse<T> of(Long code , T result)
	{
		return new JobSeekResponse<T>(code , result);
	}

}
