package com.project.jobseek.department.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.project.jobseek.company.model.Company;

@Table( name = "department" )
@Entity
@Data
public class Department
{

	@ManyToOne
	@JoinColumn( name="company_id" , referencedColumnName = "companyId" , nullable = false )
	private Company company;

	@GeneratedValue( strategy = GenerationType.IDENTITY )
	@Id
	private Long departmentId;
	private String departmentName;
	private String departmentDescription;

	@CreationTimestamp
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;

}
