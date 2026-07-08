package com.project.jobseek.user.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.Constraint;
import lombok.Data;

@Entity
@Data
public class User
{
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	@Id
	private Long userId;
	private String firstName;
	private String lastName;
	@Column(  unique = true , nullable = false )
	private String email;
}
