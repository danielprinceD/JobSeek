package com.project.jobseek.company.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.project.jobseek.company.model.Company;

@Service
public interface CompanyRepository extends JpaRepository<Company, Long>
{

}
