package com.project.jobseek.jobentity.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.List;

import com.project.jobseek.department.model.Department;
import com.project.jobseek.skills.model.Skill;

@Table( name = "job_table")
@Entity
@Data
public class JobTable
{
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	@Id
	private Long jobId;
	private String jobTitle;
	private String jobDescription;
	private String jobLocation;
	private String jobStatus;

	@ManyToOne
	@JoinColumn( name = "department_id" , referencedColumnName = "departmentId" )
	private Department department;

	@ManyToMany( cascade = { CascadeType.PERSIST , CascadeType.MERGE }  )
	@JoinTable(
		name = "job_skills" ,
		joinColumns = @JoinColumn( name = "job_id" ),
		inverseJoinColumns = @JoinColumn( name = "skill_id" )
	)
	List<Skill> skills;

}
