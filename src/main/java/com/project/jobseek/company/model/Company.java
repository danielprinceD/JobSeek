package com.project.jobseek.company.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.project.jobseek.user.model.User;

@Table(name = "company")
@Entity
@EntityListeners( AuditingEntityListener.class )
@Data
public class Company
{
	@GeneratedValue( strategy =  GenerationType.IDENTITY )
	@Id
	private Long companyId;

	private String companyName;

	@Column(  unique = true , nullable = false )
	private String companyEmail;

	private String companyPhone;

	@OneToOne( cascade = CascadeType.ALL , mappedBy = "company" )
	private CompanyAddress companyAddress;

	private String companyWebsite;

	private String companyDescription;

	@CreationTimestamp
	private LocalDateTime createdAt;

	@ManyToOne
	@CreatedBy
	@JoinColumn( name = "created_by" , referencedColumnName = "userId" , updatable = false)
	private User createdBy;

	@ManyToOne
	@LastModifiedBy
	@JoinColumn( name = "last_modified_by" , referencedColumnName = "userId" )
	private User lastModifiedBy;

	@UpdateTimestamp
	private LocalDateTime updatedAt;

	@Lob
	private byte[] companyLogo;

}
