package com.project.jobseek.company.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.jobseek.company.model.Company;

public abstract class CompanyRepository implements JpaRepository<Company, Long>
{

}
