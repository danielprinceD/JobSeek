package com.project.jobseek.company.permission.enums;

import lombok.Getter;

import com.project.jobseek.role.permission.template.EnumPermission;

@Getter
public enum CompanyEntityPermissions implements EnumPermission
{
	CAN_CREATE_COMPANY("Can create company", "Permission to create a new company"),
	CAN_READ_COMPANY("Can read company", "Permission to read company details"),
	CAN_UPDATE_COMPANY("Can update company", "Permission to update company details"),
	CAN_DELETE_COMPANY("Can delete company", "Permission to delete a company");

	public final String displayName;
	public final String description;

	CompanyEntityPermissions(String displayName, String description)
	{
		this.displayName = displayName;
		this.description = description;
	}

}
