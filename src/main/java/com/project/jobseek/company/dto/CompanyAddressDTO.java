package com.project.jobseek.company.dto;

import lombok.Data;

@Data
public class CompanyAddressDTO
{
	private Long addressId;
	private String street;
	private String city;
	private String state;
	private String country;
	private String zipCode;
}
