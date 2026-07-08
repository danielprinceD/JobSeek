package com.project.jobseek.role.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.Data;

import java.util.List;

import com.project.jobseek.role.enums.RoleStatus;
import com.project.jobseek.role.enums.RoleType;

@Entity
@Data
public class Role
{
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY )
	Long roleId;

	@Enumerated( value = EnumType.STRING )
	RoleType roleType;

	@Enumerated( value = EnumType.STRING )
	RoleStatus roleStatus;

}
