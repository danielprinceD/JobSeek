package com.project.jobseek.company.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.jobseek.company.model.Company;
import com.project.jobseek.company.repository.CompanyRepository;
import com.project.jobseek.department.model.Department;
import com.project.jobseek.department.repository.DepartmentRepository;
import com.project.jobseek.utils.user.CurrentUser;

@Component
public class CompanyService
{

	@Autowired
	private CompanyRepository companyRepository;

	@Autowired
	private DepartmentRepository departmentRepository;

	public List<Company> getAllCompanyDetails()
	{
		Optional<List<Company>> companyList = Optional.of(companyRepository.findAllByCreatedByUserId(CurrentUser.get().getUserId()));
		return companyList.orElse(List.of());
	}

	public Company getCompanyById(String companyId)
	{
		Long id = Long.parseLong(companyId);
		Optional<Company> company = Optional.ofNullable(companyRepository.findByCompanyIdAndCreatedByUserId(id , CurrentUser.get().getUserId()));
		return company.orElse(null);
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

	public List<Department> getAllDepartmentByCompanyId(Long companyId)
	{
		return departmentRepository.findAllByCompanyCompanyId(companyId);
	}

	public Department saveDepartment(Department department)
	{
		return departmentRepository.save(department);
	}

}
