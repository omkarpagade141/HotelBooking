package com.HotelBooking.HotelBooking.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.HotelBooking.HotelBooking.Entity.ContentMaster;

public interface ContentMasterService {
	
    List<ContentMaster> getAllContents();

    Optional<ContentMaster> getContentById(Long contentId);

	public void deleteById(Long contentId);

	List<Map<String, Object>> getSelectedContainFields();

	ResponseEntity<?> addContent(ContentMaster contentmaster, MultipartFile file) throws IOException;

	ResponseEntity<?> updateContent(Long contentId, ContentMaster contentMaster, MultipartFile file) throws IOException;
	





}
