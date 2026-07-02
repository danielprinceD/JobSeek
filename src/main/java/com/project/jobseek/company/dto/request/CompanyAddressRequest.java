package com.project.jobseek.company.dto.request;

import jakarta.validation.constraints.NotBlank;

public class CompanyAddressRequest
{

	private String street;
	private String city;
	private String state;
	@NotBlank( message = "Country is required" )

	private String country;
	private String zipCode;
}