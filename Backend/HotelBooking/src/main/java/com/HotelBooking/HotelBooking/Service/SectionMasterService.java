package com.HotelBooking.HotelBooking.Service;

import java.util.List;
import java.util.Optional;

import com.HotelBooking.HotelBooking.Entity.SectionMaster;
import com.HotelBooking.HotelBooking.Entity.SectionMaster;

public interface SectionMasterService {

	public SectionMaster addSection(SectionMaster section);

	public List<SectionMaster> getSection();
	
	

	Optional<SectionMaster> getSectionById(Long sectionId);

	public void deleteSection(long sectionId);

	public SectionMaster updateSection(long sectionId, SectionMaster master);


}
