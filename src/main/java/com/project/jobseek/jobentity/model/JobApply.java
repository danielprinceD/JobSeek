package com.project.jobseek.jobentity.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.Constraint;
import lombok.Data;

import com.project.jobseek.jobentity.enums.JobAppliedStatus;
import com.project.jobseek.user.model.User;

@Entity
@Data
@Table(
	uniqueConstraints = {
		@UniqueConstraint(
			columnNames = { "job_id" , "user_id" }
		)
	}
)
public class JobApply
{
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	@Id
	private Long jobApplyId;

	@ManyToOne
	@JoinColumn( name = "job_id" )
	JobTable job;

	@ManyToOne
	@JoinColumn( name = "user_id" )
	User user;

	@Enumerated( value = EnumType.ORDINAL)
	JobAppliedStatus status;

}
