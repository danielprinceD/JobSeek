package com.project.jobseek.company.permission.impl;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.project.jobseek.company.permission.enums.CompanyEntityPermissions;
import com.project.jobseek.role.enums.RoleType;
import com.project.jobseek.role.permission.template.EnumPermission;
import com.project.jobseek.role.permission.template.Permission;
import com.project.jobseek.utils.constants.EntityConstants;

public class CompanyRolePermission implements Permission
{
	public static final Map<RoleType, List<CompanyEntityPermissions>> rolePermissions = Map.of(
		RoleType.ADMIN, List.of(CompanyEntityPermissions.values()),
		RoleType.RECRUITER , List.of( CompanyEntityPermissions.values() ),
		RoleType.CANDIDATE , List.of(CompanyEntityPermissions.CAN_READ_COMPANY)
	);

	@Override  public EntityConstants getEntity()
	{
		return EntityConstants.COMPANY;
	}

	@Override  public List<? extends EnumPermission> getPermissions(RoleType roleType)
	{
		return rolePermissions.get(roleType);
	}
}
