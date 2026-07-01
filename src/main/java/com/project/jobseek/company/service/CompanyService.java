package com.project.jobseek.company.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.jobseek.company.model.Company;
import com.project.jobseek.company.repository.CompanyRepository;

@Component
public class CompanyService
{

	@Autowired
	private CompanyRepository companyRepository;

	public List<Company> getAllCompanyDetails()
	{
		return companyRepository.findAll();
	}
}
