package com.project.jobseek.company.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.jobseek.company.dto.CompanyFullDetailsDTO;
import com.project.jobseek.company.dto.request.CompanyRequest;
import com.project.jobseek.company.model.Company;
import com.project.jobseek.company.model.CompanyAddress;
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
		return ResponseEntity.ok().body(JobSeekResponse.of( HttpStatus.OK , companyFullDetailsDTOList ));
	}

	@GetMapping("/companies/{id}")
	public ResponseEntity<JobSeekResponse> getCompanyById(@PathVariable( "id" ) String companyId ){
		Optional<Company> company = Optional.ofNullable(companyService.getCompanyById(companyId));
		if(company.isEmpty())
			return ResponseEntity.status( HttpStatus.NOT_FOUND  ).body( JobSeekResponse.of(HttpStatus.NOT_FOUND , "Company ID is Invalid" ) );
		CompanyFullDetailsDTO companyFullDetail = modelMapper.map(company , CompanyFullDetailsDTO.class );
		return ResponseEntity.status( HttpStatus.OK ).body( JobSeekResponse.of( HttpStatus.OK , companyFullDetail ));
	}

	@PostMapping("/companies")
	public ResponseEntity<JobSeekResponse> saveCompany( @Valid @RequestBody CompanyRequest companyRequest){
		Company company = modelMapper.map(companyRequest , Company.class );
		company.setCompanyAddress( modelMapper.map( companyRequest.getCompanyAddress() , CompanyAddress.class ));
		Company savedCompany = companyService.saveCompany(company);
		CompanyFullDetailsDTO companyFullDetail = modelMapper.map(savedCompany , CompanyFullDetailsDTO.class );
		return ResponseEntity.status( HttpStatus.CREATED ).body( JobSeekResponse.of( HttpStatus.CREATED , companyFullDetail ));
	}

}
