package com.project.jobseek.role.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.project.jobseek.role.model.Role;

@Component
public interface RoleRepository extends JpaRepository<Role, Long>
{
}
