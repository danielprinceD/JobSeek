package com.project.jobseek.user.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.jobseek.user.model.User;
import com.project.jobseek.user.repository.UserRepository;

@Component
public class UserService
{
	@Autowired UserRepository userRepository;
	@Autowired ModelMapper modelMapper;

	public User createUser(User user){
		System.out.println(user.getUserId());
		System.out.println(user.getUserRole().getRoleId());
		return userRepository.save(user);
	}

	public User updateUser( Long userId , User updateUserDetails){
		User existingUser = userRepository.findById(userId).orElse(null);
		if(existingUser == null){
			return null;
		}
		modelMapper.map( updateUserDetails , existingUser);
		existingUser.setUserId(userId);
		return createUser(existingUser);
	}

	public User getUserById( Long userId ){
		return userRepository.findById(userId).orElse(null);
	}

	public boolean deleteUserById( Long userId ){
		User existingUser = userRepository.findById(userId).orElse(null);
		if(existingUser == null){
			return false;
		}
		userRepository.delete(existingUser);
		return true;
	}
}
