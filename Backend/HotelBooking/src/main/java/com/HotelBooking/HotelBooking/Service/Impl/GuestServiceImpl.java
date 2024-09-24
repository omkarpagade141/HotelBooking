package com.HotelBooking.HotelBooking.Service.Impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.HotelBooking.HotelBooking.Entity.BookingMaster;
import com.HotelBooking.HotelBooking.Entity.Guest;
import com.HotelBooking.HotelBooking.Exception.ResourceNotFoundException;
import com.HotelBooking.HotelBooking.Repository.BookingMasterRepository;
import com.HotelBooking.HotelBooking.Repository.GuestRepository;
import com.HotelBooking.HotelBooking.Service.IGuestService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class GuestServiceImpl implements IGuestService {

	@Autowired
	private GuestRepository guestRepo;
	
	@Autowired
	private BookingMasterRepository bookRepo;
	
	public static String uploadDirectory = System.getProperty("user.dir") + "/src/main/webapp/images";


	@Override
	public ResponseEntity<?> addGuestObjtoBooking(long bookingId, Guest guestObj, MultipartFile idProof) throws IOException {
		// TODO Auto-generated method stub
		
		BookingMaster bookObj = bookRepo.findById(bookingId)
				.orElseThrow(() -> new ResourceNotFoundException("Error For Add Guest!!! Booking not found"));
		
		if (idProof != null && !idProof.isEmpty()) {
			// Get the current date and time
			LocalDateTime now = LocalDateTime.now();

			// Define the format you want for the file name (e.g., yyyyMMdd_HHmmss)
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");

			// Generate a unique file name with the current date and time
			String currentTime = now.format(formatter);

			// Get the file extension
			String originalFileName = idProof.getOriginalFilename();
			String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));

			// Construct the new file name with date-time as name and retain the file
			// extension
			String newFileName = currentTime + fileExtension;

			// Save the file with the new name
			Path fileNameAndPath = Paths.get(uploadDirectory, newFileName);
			Files.write(fileNameAndPath, idProof.getBytes());

			// Set the new file name in customerMaster object
			guestObj.setGuestProofImagePath(newFileName);
		}
		
		
		guestObj.setBookId(bookObj);
		guestRepo.save(guestObj);
			
		
		return ResponseEntity.ok("Guest added to booking Id :"+bookingId);
	}


	@Override
	public ResponseEntity<?> showGuestDetailsByBookId(long bookingId) {
		
		Guest guestObj = guestRepo.findByBookingId(bookingId).orElse(null);
		
		if(guestObj==null)
		{
			return new ResponseEntity<>("No Guest found",HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(guestObj,HttpStatus.OK);
	}
}
