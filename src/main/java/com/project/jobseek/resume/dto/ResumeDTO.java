package com.project.jobseek.resume.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ResumeDTO
{
	private Long resumeId;

	private UserResumeDTO resumeOwner;

	private String originalFileName;

	LocalDateTime createdAt;
	LocalDateTime updatedAt;
}
