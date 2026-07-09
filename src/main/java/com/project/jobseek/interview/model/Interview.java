package com.project.jobseek.interview.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedBy;

import com.project.jobseek.interview.enums.InterviewMode;
import com.project.jobseek.interview.enums.InterviewStatus;
import com.project.jobseek.jobentity.model.JobApply;
import com.project.jobseek.user.model.User;

@Data
@Entity
public class Interview
{
	@GeneratedValue( strategy = GenerationType.IDENTITY ) @Id
	private Long interviewId;

	@ManyToOne
	@JoinColumn( name = "job_apply_id" , referencedColumnName = "jobApplyId" )
	private JobApply jobApply;

	private LocalDateTime interviewDateTime;
	private String interviewLocation;

	@Enumerated( value = EnumType.STRING )
	private InterviewMode interviewMode;

	@Enumerated( value = EnumType.STRING)
	private InterviewStatus interviewStatus;

	@ManyToOne
	@JoinColumn( name = "interviewer_id" , referencedColumnName = "userId" )
	private User interviewer;

}
