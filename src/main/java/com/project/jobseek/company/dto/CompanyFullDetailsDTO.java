package com.project.jobseek.company.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CompanyFullDetailsDTO
{
	private  Long companyId;
	private String companyName;
	private String companyEmail;
	private String companyPhone;
	private String companyAddress;
	private String companyWebsite;
	private String companyDescription;
	private byte[] companyLogo;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}
