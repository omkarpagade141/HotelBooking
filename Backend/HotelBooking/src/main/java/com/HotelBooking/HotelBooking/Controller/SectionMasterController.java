package com.HotelBooking.HotelBooking.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.HotelBooking.HotelBooking.Entity.SectionMaster;
import com.HotelBooking.HotelBooking.Service.SectionMasterService;

@RestController
@RequestMapping("api/section")
public class SectionMasterController {

	@Autowired
	SectionMasterService sectionMasterService;

	@PostMapping
	public ResponseEntity<?> addsectionmaster(@RequestBody SectionMaster sectionMaster) {
		SectionMaster master = sectionMasterService.addSection(sectionMaster);
		if(master!=null) {
			return new ResponseEntity<>(master, HttpStatus.CREATED);
		}else {
			return new ResponseEntity<>("This sections already exists!!!", HttpStatus.BAD_REQUEST);
		}
		
	}

	@GetMapping
	public ResponseEntity<?> getAllSection() {

		List<SectionMaster> list = sectionMasterService.getSection();
		return new ResponseEntity<>(list, HttpStatus.OK);

	}

	@GetMapping("/{sectionId}")
	public ResponseEntity<?> geSectiontById(@PathVariable long sectionId) {
		Optional<SectionMaster> sectionMaster = sectionMasterService.getSectionById(sectionId);
		if(sectionMaster.isPresent()) {
			return new ResponseEntity<>(sectionMaster.get(), HttpStatus.OK);
		}else {
			return new ResponseEntity<>("Section Id does Not exist!!!", HttpStatus.OK);
		}
			
		
		
	}

	@DeleteMapping("/{sectionId}")
	public ResponseEntity<?> delete(@PathVariable long sectionId) {
		try {
			return sectionMasterService.deleteSection(sectionId);
			
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("something Wrong on server", HttpStatus.NOT_FOUND);
		}
		
	}

	@PutMapping("/{sectionId}")
	public ResponseEntity<?> updateSection(@PathVariable long sectionId, @RequestBody SectionMaster master) {
		try {
			SectionMaster sectionMaster = sectionMasterService.updateSection(sectionId, master);
			return new ResponseEntity<>(sectionMaster, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}

	}
}
