package com.project.jobseek.role.dto;

import lombok.Data;

import java.util.List;

import com.project.jobseek.role.permission.enums.EntityRolePermission;

@Data
public class RoleDTO
{
	Long roleId;
	String roleType;
	String roleStatus;
	List<String> permissions;

}
