package com.HotelBooking.HotelBooking.Service.Impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.HotelBooking.HotelBooking.Entity.BookingMaster;
import com.HotelBooking.HotelBooking.Repository.BookingMasterRepository;
import com.HotelBooking.HotelBooking.Service.BookingMasterService;

@Service
public class BookingMasterServiceImpl implements BookingMasterService{

	@Autowired
	BookingMasterRepository bookingMasterRepository;
	
	public static String uploadDirectory = System.getProperty("user.dir") + "/src/main/webapp/images";

	@Override
	public BookingMaster addBooking(BookingMaster bookingMaster,MultipartFile file) throws IOException {
		if (bookingMaster!=null) {
			if (file != null && !file.isEmpty()) {
				// Get the current date and time
				LocalDateTime now = LocalDateTime.now();

				// Define the format you want for the file name (e.g., yyyyMMdd_HHmmss)
				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");

				// Generate a unique file name with the current date and time
				String currentTime = now.format(formatter);

				// Get the file extension
				String originalFileName = file.getOriginalFilename();
				String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));

				// Construct the new file name with date-time as name and retain the file
				// extension
				String newFileName = currentTime + fileExtension;

				// Save the file with the new name
				Path fileNameAndPath = Paths.get(uploadDirectory, newFileName);
				Files.write(fileNameAndPath, file.getBytes());

				// Set the new file name in customerMaster object
				bookingMaster.setImage(newFileName);
			}

		
			
		}
		System.out.println(bookingMaster);
		return bookingMasterRepository.save(bookingMaster);
	}

	@Override
	public List<BookingMaster> getallBooking() {
		return bookingMasterRepository.findAll();
	}

	@Override
	public Optional<BookingMaster> getBooking(long bookingId) {
		return bookingMasterRepository.findById(bookingId);
		
	}

	@Override
	public void deleteBooking(long bookingId) {
		bookingMasterRepository.deleteById(bookingId);
		
	}

	@Override
	public BookingMaster updateBooking(long bookingId, BookingMaster bookingMaster,MultipartFile file) throws IOException {
		
		if (file != null && !file.isEmpty()) {
			// Get the current date and time
			LocalDateTime now = LocalDateTime.now();

			// Define the format you want for the file name (e.g., yyyyMMdd_HHmmss)
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");

			// Generate a unique file name with the current date and time
			String currentTime = now.format(formatter);

			// Get the file extension
			String originalFileName = file.getOriginalFilename();
			String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));

			// Construct the new file name with date-time as name and retain the file
			// extension
			String newFileName = currentTime + fileExtension;

			// Save the file with the new name
			Path fileNameAndPath = Paths.get(uploadDirectory, newFileName);
			Files.write(fileNameAndPath, file.getBytes());

			// Set the new file name in customerMaster object
			bookingMaster.setImage(newFileName);
		}
		Optional<BookingMaster>  Master=bookingMasterRepository.findById(bookingId);
		
		
		if(Master.isPresent()) {
			BookingMaster master2=Master.get();
			master2.setCheckInDate(bookingMaster.getCheckInDate());
			master2.setCheckInTime(bookingMaster.getCheckInTime());
			master2.setCheckOutDate(bookingMaster.getCheckOutDate());
			master2.setCheckOutTime(bookingMaster.getCheckOutTime());
			master2.setInvoiceamount(bookingMaster.getInvoiceamount());
			master2.setImage(bookingMaster.getImage());
			bookingMasterRepository.save(master2);
			return master2;
		}
		return null;

	}
	

}
