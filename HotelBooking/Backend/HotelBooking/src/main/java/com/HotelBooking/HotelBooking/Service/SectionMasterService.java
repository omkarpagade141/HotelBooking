package com.HotelBooking.HotelBooking.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import com.HotelBooking.HotelBooking.Entity.SectionMaster;
import com.HotelBooking.HotelBooking.Entity.SectionMaster;

public interface SectionMasterService {

	public SectionMaster addSection(SectionMaster section);

	public List<SectionMaster> getSection();
	
	

	public Optional<SectionMaster> getSectionById(Long sectionId);

	public ResponseEntity<?> deleteSection(long sectionId);

	public SectionMaster updateSection(long sectionId, SectionMaster master);


}
