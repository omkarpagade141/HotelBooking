package com.HotelBooking.HotelBooking.Service.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.HotelBooking.HotelBooking.Entity.CustomerMaster;
import com.HotelBooking.HotelBooking.Repository.CustomerMasterRepository;
import com.HotelBooking.HotelBooking.Service.CustomerMasterService;

@Service
public class CustomerMasterServiceImpl implements CustomerMasterService {
	@Autowired
	CustomerMasterRepository customerMasterRepository;

	@Override
	public CustomerMaster addCustomer(CustomerMaster customerMaster) {
		return customerMasterRepository.save(customerMaster);
		
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
	public CustomerMaster UpdateCustomer(long customerId, CustomerMaster customerMaster) {
		Optional<CustomerMaster> master1= customerMasterRepository.findById(customerId);
		CustomerMaster master=master1.get();
		
		master.setFullName(customerMaster.getFullName());
		master.setBuildingFlatNumber(customerMaster.getBuildingFlatNumber());
		master.setCity(customerMaster.getCity());
		master.setEmail(customerMaster.getEmail());
		master.setLocality(customerMaster.getLocality());
		master.setMobileNumber(customerMaster.getMobileNumber());
		master.setPincode(customerMaster.getPincode());
		master.setPhoto(customerMaster.getPhoto());
		return customerMasterRepository.save(master);
		 
		
	}

}
