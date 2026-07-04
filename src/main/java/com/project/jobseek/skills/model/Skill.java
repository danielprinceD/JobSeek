package com.project.jobseek.skills.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Skill
{
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	@Id
	private Long skillId;
	private String skillName;
	private String skillDescription;
	private String skillLevel;
}
