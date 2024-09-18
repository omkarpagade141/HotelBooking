package com.HotelBooking.HotelBooking.Service.Impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.HotelBooking.HotelBooking.Entity.CustomerMaster;
import com.HotelBooking.HotelBooking.Repository.CustomerMasterRepository;
import com.HotelBooking.HotelBooking.Service.CustomerMasterService;

@Service
public class CustomerMasterServiceImpl implements CustomerMasterService {
	@Autowired
	CustomerMasterRepository customerMasterRepository;

	public static String uploadDirectory = System.getProperty("user.dir") + "/src/main/webapp/images";

	@Override
	public CustomerMaster addCustomer(CustomerMaster customerMaster,MultipartFile file) throws IOException {
		Optional<CustomerMaster> master = customerMasterRepository.findByMobileNumber(customerMaster.getMobileNumber());
		if (!master.isPresent()) {
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
				customerMaster.setPhoto(newFileName);
			}
			if(customerMaster.getAddedOn()==null) {
				customerMaster.setAddedOn(LocalDate.now());
			}
			return customerMasterRepository.save(customerMaster);
		} else {
			return null;
		}
	}

	@Override
	public List<CustomerMaster> getAllCustomer() {
		return customerMasterRepository.findAll();

	}

	@Override
	public Optional<CustomerMaster> getCustomeById(long customerId) {
		return customerMasterRepository.findById(customerId);

	}

	@Override
	public void DeleteCustomer(long customerId) {
		customerMasterRepository.deleteById(customerId);

	}

	@Override
	public CustomerMaster UpdateCustomer(long customerId, CustomerMaster customerMaster, MultipartFile file)
			throws IOException {
		Optional<CustomerMaster> master1 = customerMasterRepository.findById(customerId);
		CustomerMaster master = master1.get();
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
			customerMaster.setPhoto(newFileName);
		}

		master.setFullName(customerMaster.getFullName());
		master.setBuildingFlatNumber(customerMaster.getBuildingFlatNumber());
		master.setCity(customerMaster.getCity());
		master.setEmail(customerMaster.getEmail());
		master.setLocality(customerMaster.getLocality());
		master.setMobileNumber(customerMaster.getMobileNumber());
		master.setPincode(customerMaster.getPincode());
		if (customerMaster.getPhoto() == null) {
			master.setPhoto(master.getPhoto());
		} else {
			master.setPhoto(customerMaster.getPhoto());
		}
		return customerMasterRepository.save(master);

	}

}
