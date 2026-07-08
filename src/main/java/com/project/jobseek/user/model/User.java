package com.project.jobseek.user.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.project.jobseek.role.model.Role;
import com.project.jobseek.role.permission.enums.EntityRolePermission;
import com.project.jobseek.role.permission.template.EnumPermission;

@Entity
@Data
public class User implements UserDetails
{
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	@Id
	private Long userId;
	@Column( unique = true , nullable = false )
	private String username;
	private String firstName;
	private String lastName;
	@Column(  unique = true , nullable = false )
	private String email;
	@ManyToOne
	@JoinColumn( name = "role_id" , referencedColumnName = "roleId" )
	@OnDelete( action = OnDeleteAction.CASCADE )
	private Role userRole;

	@Override public Collection<? extends GrantedAuthority> getAuthorities()
	{
		Collection<GrantedAuthority> authorities = new HashSet<>();
		for(EntityRolePermission entityRolePermission : EntityRolePermission.values() ){
			List<? extends EnumPermission> permissions = entityRolePermission.getEntityPermission().getPermissions(userRole.getRoleType());
			permissions.forEach(
				permission -> authorities.add(new SimpleGrantedAuthority( entityRolePermission.getEntityPermission().getEntity() + "_" + permission.getName() ) )
			);
		}
		return authorities;
	}

	@Override public @Nullable String getPassword()
	{
		return "";
	}

	@Override public String getUsername()
	{
		return username;
	}
}
