package com.project.jobseek.utils.seeders;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.project.jobseek.role.enums.RoleType;
import com.project.jobseek.role.model.Role;
import com.project.jobseek.role.repository.RoleRepository;

@Component
public class ApplicationStartUpSeeder implements CommandLineRunner
{
	@Autowired private RoleRepository roleRepository;
	@Override public void run(String... args) throws Exception
	{
		Set<RoleType> existingRole = roleRepository.findAll().stream().map(Role::getRoleType).collect(Collectors.toSet());

		for(RoleType roleType : RoleType.values()){
			if(!existingRole.contains(roleType)){
				Role role = new Role();
				role.setRoleType(roleType);
				role.setRoleStatus(com.project.jobseek.role.enums.RoleStatus.ACTIVE);
				roleRepository.save(role);
			}
		};

	}
}
