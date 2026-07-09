package com.project.jobseek.interview.permission.enums;

import lombok.Getter;

import com.project.jobseek.role.permission.template.EnumPermission;

@Getter
public enum InterviewEntityPermission implements EnumPermission
{

	CAN_CREATE_INTERVIEW("Can create interview", "Permission to create a new interview"),
	CAN_READ_INTERVIEW("Can read interview", "Permission to read interview details"),
	CAN_UPDATE_INTERVIEW("Can update interview", "Permission to update interview details"),
	CAN_DELETE_INTERVIEW("Can delete interview", "Permission to delete an interview");

	private final String displayName;
	private final String description;

	InterviewEntityPermission( String displayName, String description)
	{
		this.displayName = displayName;
		this.description = description;
	}

}
