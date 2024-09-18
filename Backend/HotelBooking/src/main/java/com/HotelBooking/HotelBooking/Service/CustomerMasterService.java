package com.HotelBooking.HotelBooking.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.HotelBooking.HotelBooking.Entity.CustomerMaster;

public interface CustomerMasterService {

	public CustomerMaster addCustomer(CustomerMaster customerMaster,MultipartFile file) throws IOException;

	public List<CustomerMaster> getAllCustomer();

	public Optional<CustomerMaster> getCustomeById(long customerId);

	public void DeleteCustomer(long customerId);


	CustomerMaster UpdateCustomer(long customerId, CustomerMaster customerMaster, MultipartFile file) throws IOException;

}
