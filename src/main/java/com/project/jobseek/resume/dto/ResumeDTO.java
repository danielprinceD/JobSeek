package com.project.jobseek.resume.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ResumeDTO
{
	private Long resumeId;

	private UserResumeDTO resumeOwner;

	private String originalFileName;
	private String storedFilePath;

	LocalDateTime createdAt;
	LocalDateTime updatedAt;
}
