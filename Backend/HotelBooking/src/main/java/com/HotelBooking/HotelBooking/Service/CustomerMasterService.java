package com.HotelBooking.HotelBooking.Service;

import java.util.List;
import java.util.Optional;

import com.HotelBooking.HotelBooking.Entity.CustomerMaster;

public interface CustomerMasterService {

	public CustomerMaster addCustomer(CustomerMaster customerMaster);

	public List<CustomerMaster> getAllCustomer();

	public Optional<CustomerMaster> getCustomeById(long customerId);

	public void DeleteCustomer(long customerId);

	public CustomerMaster UpdateCustomer(long customerId,CustomerMaster customerMaster);

}
