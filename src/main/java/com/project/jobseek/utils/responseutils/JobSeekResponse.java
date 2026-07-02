package com.project.jobseek.utils.responseutils;

import lombok.Getter;

import org.springframework.http.HttpStatus;

@Getter
public class JobSeekResponse<T>
{
	private Integer code;
	private T result;

	private JobSeekResponse(Integer code , T result )
	{
		this.code = code;
		this.result = result;
	}

	public static <T>JobSeekResponse<T> of(HttpStatus code , T result)
	{
		return new JobSeekResponse<T>( code.value() , result);
	}

}
