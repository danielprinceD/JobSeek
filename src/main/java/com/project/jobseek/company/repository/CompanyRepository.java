package com.project.jobseek.company.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.project.jobseek.company.model.Company;

@Service
public interface CompanyRepository extends JpaRepository<Company, Long>
{
	public Company findByCompanyIdAndCreatedByUserId(Long companyId, Long createdByUserId);
	public List<Company> findAllByCreatedByUserId(Long createdByUserId);
}
