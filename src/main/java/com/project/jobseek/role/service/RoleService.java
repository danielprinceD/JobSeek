package com.project.jobseek.role.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.jobseek.role.model.Role;
import com.project.jobseek.role.repository.RoleRepository;

@Component
public class RoleService
{
	@Autowired RoleRepository roleRepository;

	public Role getRoleById( Long roleId ){
		return roleRepository.findById(roleId).orElse(null);
	}
}
