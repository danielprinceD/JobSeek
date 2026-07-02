package com.project.jobseek.utils.exceptionhandler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.project.jobseek.utils.responseutils.JobSeekResponse;

@RestControllerAdvice
public class GlobalExceptionHandler
{
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<JobSeekResponse> handleValidationExceptions(MethodArgumentNotValidException ex)
	{
		StringBuilder errors = new StringBuilder();
		ex.getBindingResult().getFieldErrors().forEach(
			error-> {
				if(!errors.isEmpty())
					errors.append(", ");
				errors.append(error.getDefaultMessage());
			}
		);
		return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR).body(JobSeekResponse.of(HttpStatus.INTERNAL_SERVER_ERROR , errors.toString() ) );
	}
}
