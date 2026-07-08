package com.project.jobseek.role.permission.enums;

import lombok.Getter;

import com.project.jobseek.company.permission.impl.CompanyRolePermission;
import com.project.jobseek.role.permission.template.Permission;
import com.project.jobseek.utils.constants.EntityConstants;

@Getter
public enum EntityRolePermission
{
	COMPANY( EntityConstants.COMPANY , new CompanyRolePermission());
	private final EntityConstants entity;
	private final Permission entityPermission;
	EntityRolePermission( EntityConstants entity, Permission entityPermission){
		this.entity = entity;
		this.entityPermission = entityPermission;
	}
}
