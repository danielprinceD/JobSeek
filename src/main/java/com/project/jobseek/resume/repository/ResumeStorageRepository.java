package com.project.jobseek.resume.repository;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.project.jobseek.resume.model.Resume;
import com.project.jobseek.user.model.User;

@Component
public interface ResumeStorageRepository extends JpaRepository<Resume , Long>
{
	List<Resume> findByResumeOwnerUserId(Long userId);
}
