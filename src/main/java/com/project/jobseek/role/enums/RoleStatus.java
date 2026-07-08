package com.project.jobseek.role.enums;

public enum RoleStatus
{
	ACTIVE("Active", "Role is active and can be assigned to users"),
	INACTIVE("Inactive", "Role is inactive and cannot be assigned to users");

	private String displayName;
	private String description;
	RoleStatus(String displayName, String description)
	{
		this.displayName = displayName;
		this.description = description;
	}
}
