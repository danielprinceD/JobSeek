package com.project.jobseek.company.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.jobseek.company.dto.CompanyFullDetailsDTO;
import com.project.jobseek.company.service.CompanyService;
import com.project.jobseek.utils.responseutils.JobSeekResponse;

@RequestMapping("/api/v1")
@RestController
public class CompanyControllerV1
{
	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private CompanyService companyService;

	@GetMapping("/companies")
	public ResponseEntity<JobSeekResponse> getCompany()
	{
		List<CompanyFullDetailsDTO> companyFullDetailsDTOList = companyService.getAllCompanyDetails().stream().map(
			company -> modelMapper.map(company , CompanyFullDetailsDTO.class )
		).collect(Collectors.toList());
		return ResponseEntity.ok().body(JobSeekResponse.of( 200L , companyFullDetailsDTOList ));
	}
}
