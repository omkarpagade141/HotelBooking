package com.HotelBooking.HotelBooking.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.HotelBooking.HotelBooking.Entity.ContentMaster;

@Repository
public interface ContentMasterRepository extends JpaRepository<ContentMaster, Long>{

	Optional<ContentMaster> findByContentTitle(String contentTitle);

	@Query("SELECT new map(c.contentId as contentId,s.sectionId as sectionId,s.name as sectionName,c.contentTitle as contentTitle)" +"FROM ContentMaster c JOIN c.section s")
	List<Map<String, Object>> getSelectedContainFields();

}
