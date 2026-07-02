package com.project.jobseek.company.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CompanyRequest
{
	@NotBlank(message = "Company name is required")
	@Size( min = 2 , max = 100 , message = "Company name must be between 2 and 100 characters")
	private String companyName;

	@Email(message = "Invalid email format")
	private String companyEmail;

	@Min(value = 10, message = "Phone number must be at least 10 digits")
	private String companyPhone;

	private CompanyAddressRequest companyAddress;

	private String companyWebsite;

	private String companyDescription;

	private byte[] companyLogo;
}
