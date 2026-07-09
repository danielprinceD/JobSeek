package com.project.jobseek.interview.permission.impl;

import java.util.List;
import java.util.Map;

import com.project.jobseek.company.permission.enums.CompanyEntityPermissions;
import com.project.jobseek.interview.permission.enums.InterviewEntityPermission;
import com.project.jobseek.role.enums.RoleType;
import com.project.jobseek.role.permission.template.EnumPermission;
import com.project.jobseek.role.permission.template.Permission;
import com.project.jobseek.utils.constants.EntityConstants;

public class InterviewRolePermission implements Permission
{
	public static final Map<RoleType, List<InterviewEntityPermission>> rolePermissions = Map.of(
		RoleType.ADMIN, List.of(InterviewEntityPermission.values()),
		RoleType.RECRUITER , List.of( InterviewEntityPermission.values() ),
		RoleType.CANDIDATE , List.of( InterviewEntityPermission.CAN_READ_INTERVIEW )
	);

	@Override public EntityConstants getEntity()
	{
		return EntityConstants.INTERVIEW;
	}

	@Override public List<? extends EnumPermission> getPermissions(RoleType roleType)
	{
		return rolePermissions.get(roleType);
	}
}
