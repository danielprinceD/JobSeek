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

	public Company getCompanyById(String companyId)
	{
		Long id = Long.parseLong(companyId);
		return companyRepository.findById(id).orElse(null);
	}

	public Company saveCompany(Company company)
	{
		return companyRepository.save(company);
	}

	public boolean deleteCompany(Long companyId)
	{
		if(companyRepository.existsById(companyId))
		{
			companyRepository.deleteById(companyId);
			return true;
		}
		return false;
	}
}
