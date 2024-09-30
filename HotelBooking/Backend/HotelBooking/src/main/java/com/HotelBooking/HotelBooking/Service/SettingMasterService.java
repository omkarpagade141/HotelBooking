package com.HotelBooking.HotelBooking.Service;

import com.HotelBooking.HotelBooking.Entity.SettingMaster;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface SettingMasterService {

    SettingMaster updateSetting(SettingMaster settingMaster , MultipartFile multipartFile) throws IOException;


    ResponseEntity<?> getSettingById(Long settingId);
}
