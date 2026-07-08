package com.project.jobseek.role.permission.template;

import java.util.List;

import com.project.jobseek.role.enums.RoleType;
import com.project.jobseek.utils.constants.EntityConstants;

public interface Permission
{
	EntityConstants getEntity();

	List<? extends EnumPermission> getPermissions(RoleType roleType);
}
