package com.HotelBooking.HotelBooking.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.HotelBooking.HotelBooking.Entity.SectionMaster;

@Repository
public interface SectionMasterRepositiry extends JpaRepository<SectionMaster,Long>{

	
	Optional<SectionMaster> findByName(String name);

}
