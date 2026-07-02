package com.project.jobseek.company.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Table(name = "company")
@Entity
@Data
public class Company
{
	@GeneratedValue( strategy =  GenerationType.IDENTITY )
	@Id
	private Long companyId;

	private String companyName;

	@Column(  unique = true , nullable = false )
	private String companyEmail;
	
	private String companyPhone;

	@OneToOne( cascade = CascadeType.ALL , mappedBy = "company" ,fetch = FetchType.LAZY )
	private CompanyAddress companyAddress;

	private String companyWebsite;

	private String companyDescription;

	@CreationTimestamp
	private LocalDateTime createdAt;

	@UpdateTimestamp
	private LocalDateTime updatedAt;

	@Lob
	private byte[] companyLogo;

}
