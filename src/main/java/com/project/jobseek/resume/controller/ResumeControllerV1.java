package com.project.jobseek.resume.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.jobseek.resume.dto.ResumeDTO;
import com.project.jobseek.resume.model.Resume;
import com.project.jobseek.resume.service.ResumeService;
import com.project.jobseek.utils.responseutils.JobSeekResponse;

@RequestMapping("/api/v1")
@RestController
public class ResumeControllerV1
{
	@Autowired private ResumeService resumeService;
	@Autowired private ModelMapper modelMapper;

	@PostMapping("/resumes/upload")
	public ResponseEntity<? extends JobSeekResponse<?>> storeResume( @RequestParam("file") MultipartFile file )
	{

		Resume resume = resumeService.storeResume(file);
		ResumeDTO resumeDTO = modelMapper.map( resume , ResumeDTO.class);
		return JobSeekResponse.withResponseEntity(HttpStatus.CREATED , resumeDTO);
	}

	@GetMapping("/resumes")
	public ResponseEntity<? extends JobSeekResponse<?>> getAllResumeByCurrentUser()
	{
		List<ResumeDTO> resumes = resumeService.getAllResumeByCurrentUser().stream().map(resume -> modelMapper.map(resume, ResumeDTO.class)).toList();
		return JobSeekResponse.withResponseEntity(HttpStatus.OK , resumes);
	}

	@DeleteMapping("/resumes/{resumeId}")
	public ResponseEntity<? extends JobSeekResponse<?>> deleteResume(@RequestParam("resumeId") Long resumeId)
	{

		boolean isDeleted = resumeService.deleteResume(resumeId);
		if(!isDeleted)
			return JobSeekResponse.withResponseEntity(HttpStatus.NOT_FOUND,"Resume not found");

		return JobSeekResponse.withResponseEntity(HttpStatus.OK,"Resume deleted successfully");
	}

}
