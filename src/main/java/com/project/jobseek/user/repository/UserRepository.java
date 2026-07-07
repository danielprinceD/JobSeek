package com.project.jobseek.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.project.jobseek.user.model.User;

@Component
public interface UserRepository extends JpaRepository<User , Long>
{
}
