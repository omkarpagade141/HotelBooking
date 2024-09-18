package com.HotelBooking.HotelBooking.Service.Impl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.HotelBooking.HotelBooking.Entity.SectionMaster;
import com.HotelBooking.HotelBooking.Repository.SectionMasterRepositiry;
import com.HotelBooking.HotelBooking.Service.SectionMasterService;

@Service
public class SectionMasterServiceImpl implements SectionMasterService {

	@Autowired
	SectionMasterRepositiry sectionMasterRepositiry;

	@Override
	public SectionMaster addSection(SectionMaster section) {
		Optional<SectionMaster> master = sectionMasterRepositiry.findByName(section.getName());
		if (!master.isPresent()) {
			if (section.getCreatedOn() == null) {
				section.setCreatedOn(LocalDate.now());
			}
			return sectionMasterRepositiry.save(section);
		} else {
			return null;
		}

	}

	@Override
	public List<SectionMaster> getSection() {
		return sectionMasterRepositiry.findAll();

	}

	@Override
	public Optional<SectionMaster> getSectionById(Long sectionId) {
		return sectionMasterRepositiry.findById(sectionId);
	}

	@Override
	public Boolean deleteSection(long sectionId) {
		Optional<SectionMaster> master = sectionMasterRepositiry.findById(sectionId);
	if(master.isPresent()){
		SectionMaster master2 = master.get();
		if (master2 != null) {
			sectionMasterRepositiry.deleteById(sectionId);
			return true;
		}
		}
		return false;

	}

	@Override
	public SectionMaster updateSection(long sectionId, SectionMaster master) {
		Optional<SectionMaster> master2 = sectionMasterRepositiry.findById(sectionId);

		SectionMaster sectionMaster = master2.get();

		sectionMaster.setName(master.getName());
		return sectionMasterRepositiry.save(sectionMaster);

	}

}
