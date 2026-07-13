package com.project.jobseek.resume.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.UUID;
import java.util.function.Consumer;
import java.util.function.Supplier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

import com.project.jobseek.resume.model.Resume;
import com.project.jobseek.resume.repository.ResumeStorageRepository;
import com.project.jobseek.user.model.User;
import com.project.jobseek.utils.user.CurrentUser;

@Component
public class ResumeService
{
	private static final String RESUME_STORAGE_DIR = "UserResumeFileStorage";
	@Autowired private ResumeStorageRepository resumeStorageRepository;

	public List<Resume> getAllResumeByCurrentUser()
	{
		User currentUser = CurrentUser.get();
		return resumeStorageRepository.findByResumeOwnerUserId(CurrentUser.get().getUserId());
	}

	public Resume getResumeByIdForCurrentUser(Long resumeId)
	{
		return resumeStorageRepository.findByResumeIdAndResumeOwnerUserId(resumeId , CurrentUser.get().getUserId());
	}

	public Resume storeResume(MultipartFile file ){

		Resume resume = new Resume();

		File outputFilePath = new File( RESUME_STORAGE_DIR + File.separator + Path.of(CurrentUser.get().getUserId() + File.separator + UUID.randomUUID() + "_" + file.getOriginalFilename() ).toString());


		resume.setStoredFilePath(outputFilePath.getAbsolutePath());
		resume.setOriginalFileName(outputFilePath.getName());


		try {
			Files.createDirectories(outputFilePath.getParentFile().toPath());

			try (OutputStream outputStream = new FileOutputStream(outputFilePath)) {
				StreamUtils.copy( file.getInputStream() , outputStream);
			}

			return resumeStorageRepository.save(resume);

		} catch (Exception e) {
			outputFilePath.delete();
			System.out.println(e.getMessage());
			throw new RuntimeException("Failed to store resume", e);
		}

	}

	public boolean deleteResumeForCurrentUser(Long resumeId)
	{
		Resume resume = resumeStorageRepository.findByResumeIdAndResumeOwnerUserId(resumeId , CurrentUser.get().getUserId() );

		if(resume == null){
			return false;
		}

		resumeStorageRepository.deleteByResumeIdAndResumeOwnerUserId(resumeId , CurrentUser.get().getUserId());

		File file = new File(resume.getStoredFilePath());
		if (file.exists()) {
			file.delete();
		}
		return true;

	}

	public InputStream getFileResourceForResume(Resume resume) throws IOException
	{
		return Files.newInputStream( Path.of(resume.getStoredFilePath()) );
	}

}
