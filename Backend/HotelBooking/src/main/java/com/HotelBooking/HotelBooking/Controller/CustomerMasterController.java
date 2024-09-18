package com.HotelBooking.HotelBooking.Controller;

import java.io.IOException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.HotelBooking.HotelBooking.Entity.CustomerMaster;
import com.HotelBooking.HotelBooking.Service.CustomerMasterService;

@RestController
@RequestMapping("api/customer")
public class CustomerMasterController {

	@Autowired
	CustomerMasterService customerMasterService;


	@PostMapping()
	public ResponseEntity<?> createCustomer(@RequestPart("customer") CustomerMaster customerMaster,
			@RequestParam(value = "image", required = false) MultipartFile file) throws IOException {
		
		CustomerMaster customerMaster2 = customerMasterService.addCustomer(customerMaster,file);
		if (customerMaster2 != null) {
			return new ResponseEntity<>(customerMaster2, HttpStatus.OK);
		} else {
			return new ResponseEntity<>("These UserName Already Exist", HttpStatus.NOT_FOUND);
		}

	}

	@GetMapping
	public ResponseEntity<List<CustomerMaster>> getAllCustomer() {
		List<CustomerMaster> list = customerMasterService.getAllCustomer();
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	@GetMapping("/{customerId}")
	public ResponseEntity<?> getCustomerById(@PathVariable long customerId) {
		Optional<CustomerMaster> customerMaster = customerMasterService.getCustomeById(customerId);
		if (customerMaster.isPresent()) {
			return new ResponseEntity<>(customerMaster.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>("customerId Does Not Exist", HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{customerId}")
	public ResponseEntity<Boolean> deleteCustomer(@PathVariable long customerId) {
		customerMasterService.DeleteCustomer(customerId);
		return new ResponseEntity<>(true, HttpStatus.OK);
	}

	@PutMapping("/{customerId}")
	public CustomerMaster UpdateCustomer(@PathVariable("customerId") long customerId,
			@RequestPart("customer") CustomerMaster customerMaster,
			@RequestParam(value = "image", required = false) MultipartFile file) throws IOException {
		return customerMasterService.UpdateCustomer(customerId, customerMaster, file);
	}

}
