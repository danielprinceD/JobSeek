package com.project.jobseek.role.enums;

public enum RoleType
{
	ADMIN("Admin", "Admin role with all permissions"),
	RECRUITER("Recruiter", "Recruiter role with limited permissions"),
	CANDIDATE("Candidate", "Candidate role with limited permissions");

	private String displayName;
	private String description;
	RoleType(String displayName, String description)
	{
		this.displayName = displayName;
		this.description = description;
	}
}
