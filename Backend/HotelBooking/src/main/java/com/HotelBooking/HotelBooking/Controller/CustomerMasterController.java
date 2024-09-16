package com.HotelBooking.HotelBooking.Controller;

import java.io.IOException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.HotelBooking.HotelBooking.Entity.CustomerMaster;
import com.HotelBooking.HotelBooking.Service.CustomerMasterService;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

@RestController
@RequestMapping("api/customer")
public class CustomerMasterController {

	@Autowired
	CustomerMasterService customerMasterService;

	public static String uploadDirectory = System.getProperty("user.dir") + "/src/main/webapp/images";

	@PostMapping()
	public ResponseEntity<?> createSettingMaster(@RequestPart("customer") CustomerMaster customerMaster,
			@RequestParam(value = "image", required = false) MultipartFile file) throws IOException {
		if (file != null && !file.isEmpty()) {
			String originalFileName = file.getOriginalFilename();
			Path fileNameAndPath = Paths.get(uploadDirectory, originalFileName);
			Files.write(fileNameAndPath, file.getBytes());
			customerMaster.setPhoto(originalFileName);

		}

		CustomerMaster customerMaster2 = customerMasterService.addCustomer(customerMaster);
		return new ResponseEntity<>(customerMaster2, HttpStatus.OK);

	}
	@GetMapping
	public ResponseEntity<List<CustomerMaster>> getAllCustomer() {
		List< CustomerMaster> list=customerMasterService.getAllCustomer();
		return new ResponseEntity<>(list,HttpStatus.OK);
	}
	
	@GetMapping("/{customerId}")
	public ResponseEntity<CustomerMaster> getCustomerById(@PathVariable long customerId) {
		Optional<CustomerMaster> customerMaster=customerMasterService.getCustomeById(customerId);
		return new ResponseEntity<>(customerMaster.get(),HttpStatus.OK);
	}
	
	@DeleteMapping("/{customerId}")
	public ResponseEntity<Boolean> deleteCustomer(@PathVariable long customerId) {
		customerMasterService.DeleteCustomer(customerId);
		return new ResponseEntity<>(true,HttpStatus.OK);
	}
	

}
