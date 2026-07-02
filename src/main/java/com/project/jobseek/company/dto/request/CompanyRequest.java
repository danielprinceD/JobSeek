package com.project.jobseek.company.dto.request;

import lombok.Data;

@Data
public class CompanyRequest
{
	private String companyName;
	private String companyEmail;
	private String companyPhone;
	private String companyAddress;
	private String companyWebsite;
	private String companyDescription;
	private byte[] companyLogo;
}
