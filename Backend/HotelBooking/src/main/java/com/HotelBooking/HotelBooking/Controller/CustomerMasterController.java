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
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin(origins = "*")
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
			return new ResponseEntity<>("These UserName Already Exist", HttpStatus.BAD_REQUEST);
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
	public ResponseEntity<?> deleteCustomer(@PathVariable long customerId) throws IOException {
		
		return customerMasterService.DeleteCustomer(customerId);
	}

	@PutMapping("/{customerId}")
	public ResponseEntity<?> UpdateCustomer(@PathVariable("customerId") long customerId,
			@RequestPart("customer") CustomerMaster customerMaster,
			@RequestParam(value = "image", required = false) MultipartFile file) throws IOException {
		return customerMasterService.UpdateCustomer(customerId, customerMaster, file);
	}

}

//package com.HotelBooking.HotelBooking.Controller;
//
//import java.io.IOException;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.Optional;
//
//import com.HotelBooking.HotelBooking.security.JwtHelper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RequestPart;
//import org.springframework.web.bind.annotation.RequestHeader;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.HotelBooking.HotelBooking.Entity.CustomerMaster;
//import com.HotelBooking.HotelBooking.Service.CustomerMasterService;
//
//@RestController
//@RequestMapping("api/customer")
//public class CustomerMasterController {
//
//	@Autowired
//	CustomerMasterService customerMasterService;
//
//	@Autowired
//	private JwtHelper jwtHelper;
//
//	// Create customer with refresh token response
//	@PostMapping()
//	public ResponseEntity<?> createCustomer(@RequestPart("customer") CustomerMaster customerMaster,
//											@RequestParam(value = "image", required = false) MultipartFile file,
//											@RequestHeader(value = "Authorization", required = false) String authorizationHeader) throws IOException {
//
//		CustomerMaster customerMaster2 = customerMasterService.addCustomer(customerMaster, file);
//		if (customerMaster2 != null) {
//			// Create response body with customer data and new token
//			return new ResponseEntity<>(createResponseWithNewToken(authorizationHeader, customerMaster2), HttpStatus.OK);
//		} else {
//			return new ResponseEntity<>("These UserName Already Exist", HttpStatus.BAD_REQUEST);
//		}
//	}
//
//	//	@PostMapping()
////	public ResponseEntity<?> createCustomer(@RequestPart("customer") CustomerMaster customerMaster,
////			@RequestParam(value = "image", required = false) MultipartFile file) throws IOException {
////
////		CustomerMaster customerMaster2 = customerMasterService.addCustomer(customerMaster,file);
////		if (customerMaster2 != null) {
////			return new ResponseEntity<>(customerMaster2, HttpStatus.OK);
////		} else {
////			return new ResponseEntity<>("These UserName Already Exist", HttpStatus.BAD_REQUEST);
////		}
////
////	}
//
//	// Get all customers with refresh token response
//	@GetMapping
//	public ResponseEntity<?> getAllCustomer(@RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
//		List<CustomerMaster> list = customerMasterService.getAllCustomer();
//
//		// Create response body with customer list and new token
//		return new ResponseEntity<>(createResponseWithNewToken(authorizationHeader, list), HttpStatus.OK);
//	}
//
//	// Get customer by ID with refresh token response
//	@GetMapping("/{customerId}")
//	public ResponseEntity<?> getCustomerById(@PathVariable long customerId,
//											 @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
//		Optional<CustomerMaster> customerMaster = customerMasterService.getCustomeById(customerId);
//		if (customerMaster.isPresent()) {
//			// Create response body with customer and new token
//			return new ResponseEntity<>(createResponseWithNewToken(authorizationHeader, customerMaster.get()), HttpStatus.OK);
//		} else {
//			return new ResponseEntity<>("customerId Does Not Exist", HttpStatus.NOT_FOUND);
//		}
//	}
//
//	// Delete customer with refresh token response
//	@DeleteMapping("/{customerId}")
//	public ResponseEntity<?> deleteCustomer(@PathVariable long customerId,
//											@RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
//		ResponseEntity<?> response = customerMasterService.DeleteCustomer(customerId);
//
//		// Create response body with status and new token
//		return new ResponseEntity<>(createResponseWithNewToken(authorizationHeader, response.getBody()), response.getStatusCode());
//	}
//
//	// Update customer with refresh token response
//	@PutMapping("/{customerId}")
//	public ResponseEntity<?> updateCustomer(@PathVariable("customerId") long customerId,
//											@RequestPart("customer") CustomerMaster customerMaster,
//											@RequestParam(value = "image", required = false) MultipartFile file,
//											@RequestHeader(value = "Authorization", required = false) String authorizationHeader) throws IOException {
//		ResponseEntity<?> response = customerMasterService.UpdateCustomer(customerId, customerMaster, file);
//
//		// Create response body with updated customer and new token
//		return new ResponseEntity<>(createResponseWithNewToken(authorizationHeader, response.getBody()), response.getStatusCode());
//	}
//
//	// Utility method to create response body with data and new token
//	private Map<String, Object> createResponseWithNewToken(String authorizationHeader,Object responseData) {
//		Map<String, Object> responseBody = new HashMap<>();
//		responseBody.put("data", responseData);
//
//		// Generate and add the new token to the response if the current token is valid
//		if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
//			String oldToken = authorizationHeader.substring(7); // Extract token from Authorization header
//
//			try {
//				// Validate the existing token before generating a new one
//				if (jwtHelper.isTokenValid(oldToken)) {
//					// Generate a new token based on the old one
//					String newToken = jwtHelper.refreshToken(oldToken);
//					responseBody.put("newToken", newToken); // Attach the new token
//				}
//			} catch (Exception e) {
//				// Log and handle the exception, possibly add more error handling here
//				e.printStackTrace();
//			}
//		}
//		return responseBody;
//	}
//}

