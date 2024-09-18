package com.HotelBooking.HotelBooking.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.HotelBooking.HotelBooking.Entity.ContentMaster;

public interface ContentMasterService {
	
    List<ContentMaster> getAllContents();

    Optional<ContentMaster> getContentById(Long contentId);

	ContentMaster save(ContentMaster contentmaster);

	public void deleteById(Long contentId);

	List<Map<String, Object>> getSelectedContainFields();
	





}
