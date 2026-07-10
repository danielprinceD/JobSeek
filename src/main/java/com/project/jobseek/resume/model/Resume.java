package com.project.jobseek.resume.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.stereotype.Component;

import com.project.jobseek.user.model.User;

@Component
@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Resume
{
	@Id @GeneratedValue
	private Long resumeId;

	@CreatedBy
	@ManyToOne
	@JoinColumn(name = "resume_owner" , referencedColumnName = "userId" , updatable = false)
	private User resumeOwner;

	private String originalFileName;
	private String storedFilePath;

	@CreationTimestamp LocalDateTime createdAt;
	@UpdateTimestamp LocalDateTime updatedAt;
}
