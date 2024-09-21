package com.HotelBooking.HotelBooking.Repository;

import com.HotelBooking.HotelBooking.Entity.SettingMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SettingMasterRepository extends JpaRepository<SettingMaster, Long> {

    @Query("SELECT s FROM SettingMaster s ORDER BY s.companyName ASC")
    List<SettingMaster> findAllOrdered();

}
