package com.project.jobseek.jobentity.enums;

import lombok.Getter;

@Getter
public enum JobAppliedStatus
{

	APPLIED( 1 , "Applied"),
	REJECTED(2 , "Rejected"),
	SHORTLISTED( 3, "Shortlisted"),
	INTERVIEW_SCHEDULED(4,"Interview Scheduled"),
	OFFERED(5 ,"Offered"),
	ACCEPTED(6,"A ccepted"),
	REJECTED_OFFER(7 ,"Rejected Offer");

	private final String status;
	private final int statusCode;
	JobAppliedStatus( int statusCode ,String status)
	{
		this.statusCode = statusCode;
		this.status = status;
	}
}
