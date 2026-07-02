package com.project.jobseek.company.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Table( name = "company_address")
@Entity
@Data
public class CompanyAddress
{
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	@Id
	private Long companyAddressId;

	@OneToOne
	@JoinColumn( name = "company_address_id" , referencedColumnName = "company_id" , nullable = false , unique = true )
	private Company company;

	private String street;
	private String city;
	private String state;
	private String country;
	private String zipCode;

}
