package com.HotelBooking.HotelBooking.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.HotelBooking.HotelBooking.Entity.ContentMaster;

@Repository
public interface ContentMasterRepository extends JpaRepository<ContentMaster, Long>{

	Optional<ContentMaster> findByContentTitle(String contentTitle);

}
