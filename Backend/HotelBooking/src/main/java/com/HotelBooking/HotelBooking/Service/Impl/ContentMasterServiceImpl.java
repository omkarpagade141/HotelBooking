package com.HotelBooking.HotelBooking.Service.Impl;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.HotelBooking.HotelBooking.Entity.ContentMaster;
import com.HotelBooking.HotelBooking.Repository.ContentMasterRepository;
import com.HotelBooking.HotelBooking.Service.ContentMasterService;

@Service
public class ContentMasterServiceImpl implements ContentMasterService{
	
	@Autowired
	ContentMasterRepository contentMasterRepository;	
	

    @Override
    public List<ContentMaster> getAllContents() {
        return contentMasterRepository.findAll();
    }


    @Override
    public Optional<ContentMaster> getContentById(Long contentId) {
        return contentMasterRepository.findById(contentId);
    }


	@Override
	public ContentMaster save(ContentMaster contentmaster) {
		if (contentmaster.getContentDate() == null) {
            contentmaster.setContentDate(LocalDate.now()); // Set current date if not provided
        }
		return contentMasterRepository.save(contentmaster);
	}


	@Override
	public void deleteById(Long contentId) {
		 contentMasterRepository.deleteById(contentId);;
	}


	@Override
	public List<Map<String, Object>> getSelectedContainFields() {
		return contentMasterRepository.getSelectedContainFields();
	}



}
