package com.project.jobseek.user.controller;

import jakarta.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.jobseek.role.model.Role;
import com.project.jobseek.role.service.RoleService;
import com.project.jobseek.user.dto.UserDTO;
import com.project.jobseek.user.dto.request.UserRequest;
import com.project.jobseek.user.model.User;
import com.project.jobseek.user.service.UserService;
import com.project.jobseek.utils.responseutils.JobSeekResponse;

@RequestMapping("/api/v1")
@RestController
public class UserControllerV1
{
	@Autowired private UserService userService;
	@Autowired private RoleService roleService;
	@Autowired private ModelMapper modelMapper;

	@GetMapping("/users/{userID}")
	public ResponseEntity<? extends JobSeekResponse<?>> getUserById(@PathVariable("userID") String userID){
		Long userId = Long.parseLong(userID);
		User user = userService.getUserById(userId);
		if(user == null){
			return JobSeekResponse.withResponseEntity(HttpStatus.NOT_FOUND , "User not found");
		}
		UserDTO userDTO = modelMapper.map(user , UserDTO.class);
		return JobSeekResponse.withResponseEntity(HttpStatus.OK , userDTO);
	}

	@PostMapping("/users")
	public ResponseEntity<? extends JobSeekResponse<?>> createUser(@Valid  @RequestBody UserRequest userRequest){
		User user = modelMapper.map(userRequest , User.class);
		Long roleId = userRequest.getUserRole();
		if(roleId == null){
			return JobSeekResponse.withResponseEntity(HttpStatus.BAD_REQUEST , "Role ID is required");
		}
		Role role = roleService.getRoleById(roleId);
		if(role == null){
			return JobSeekResponse.withResponseEntity(HttpStatus.BAD_REQUEST , "Role not found");
		}
		user.setUserRole(role);

		User createdUser = userService.createUser(user);
		if(createdUser == null){
			return JobSeekResponse.withResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR , "User creation failed");
		}
		UserDTO userDTO = modelMapper.map(createdUser , UserDTO.class);
		return JobSeekResponse.withResponseEntity(HttpStatus.CREATED , userDTO);
	}

	@PutMapping("/users/{userId}")
	public ResponseEntity<? extends JobSeekResponse<?>> updateUser(@PathVariable("userId") String inputUserId , @RequestBody UserRequest userRequest){
		Long userId = Long.parseLong(inputUserId);
		User updateUser = userService.updateUser(userId , modelMapper.map(userRequest , User.class));
		if(updateUser == null){
			return JobSeekResponse.withResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR , "User update failed");
		}
		return JobSeekResponse.withResponseEntity(HttpStatus.OK , updateUser);
	}

	@DeleteMapping("/users/{userID}")
	public ResponseEntity<? extends JobSeekResponse<?>> deleteUser(@PathVariable("userId") String ipUserId){
		Long userId = Long.parseLong(ipUserId);
		boolean isDeleted = userService.deleteUserById(userId);
		if(!isDeleted){
			return JobSeekResponse.withResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR , "User deletion failed");
		}
		return JobSeekResponse.withResponseEntity(HttpStatus.OK , "User deleted successfully");
	}

}
