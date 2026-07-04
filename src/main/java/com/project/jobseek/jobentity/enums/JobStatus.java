package com.project.jobseek.jobentity.enums;

import lombok.Data;
import lombok.Getter;

@Getter
public enum JobStatus
{
	OPEN(1 , "open"),
	CLOSED(2 , "closed"),
	PENDING(3 , "pending"),
	FILLED(4 , "filled");
	JobStatus(int code, String status){
		this.code = code;
		this.status = status;
	}
	private final int code;
	private final String status;

}
