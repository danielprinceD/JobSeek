package com.project.jobseek.user.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
	private String email;
}
