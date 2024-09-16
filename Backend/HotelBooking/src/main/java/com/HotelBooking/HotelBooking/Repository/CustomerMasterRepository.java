package com.HotelBooking.HotelBooking.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.HotelBooking.HotelBooking.Entity.CustomerMaster;

@Repository
public interface CustomerMasterRepository extends JpaRepository<CustomerMaster, Long>{

	
}
