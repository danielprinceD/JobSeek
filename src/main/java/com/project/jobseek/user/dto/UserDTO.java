package com.project.jobseek.user.dto;

import lombok.Data;

import java.util.List;

import com.project.jobseek.role.dto.RoleDTO;

@Data
public class UserDTO
{
	private Long userId;
	private String firstName;
	private String lastName;
	private String email;
	private String username;
	private RoleDTO userRole;
	private List authorities;
}
