package com.project.jobseek.jobentity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
public class JobApplyRequest
{
	private Long jobId;
	private Long userId;
	private Integer status;

}
