package com.HotelBooking.HotelBooking.Service.Impl;
import com.HotelBooking.HotelBooking.Entity.SettingMaster;
import com.HotelBooking.HotelBooking.Repository.SettingMasterRepository;
import com.HotelBooking.HotelBooking.Service.SettingMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SettingMasterServiceImpl implements SettingMasterService {

    @Autowired
    private SettingMasterRepository settingMasterRepository;

    public static   String path = System.getProperty("user.dir") + "/src/main/webapp/images/settings";



    @Override
    public SettingMaster updateSetting(SettingMaster settingMaster, MultipartFile businessLogo) throws IOException {
        try {
            System.out.println("IMAGE UPDATED--settingName - " + settingMaster.getCompanyName());

            List<SettingMaster> settings = settingMasterRepository.findAllOrdered();
            SettingMaster existingSetting = settings.isEmpty() ? null : settings.get(0);

            if (existingSetting != null) {
                // Update existing setting
                existingSetting.setCompanyName(settingMaster.getCompanyName());
                existingSetting.setAddress(settingMaster.getAddress());
                existingSetting.setEmail(settingMaster.getEmail());
                existingSetting.setPhoneNumber(settingMaster.getPhoneNumber());

                if (businessLogo != null && !businessLogo.isEmpty()) {
                    String oldFilePath = path + File.separator + existingSetting.getBusinessLogo();
                    File oldFile = new File(oldFilePath);
                    if (oldFile.exists()) {
                        oldFile.delete();
                    }

                    String fileName = businessLogo.getOriginalFilename();
                    String randomId = UUID.randomUUID().toString();
                    String newFileName = randomId.concat(fileName.substring(fileName.lastIndexOf(".")));
                    String newFilePath = path + File.separator + newFileName;

                    Files.copy(businessLogo.getInputStream(), Paths.get(newFilePath));
                    existingSetting.setBusinessLogo(newFileName);
                }

                return settingMasterRepository.save(existingSetting);
            } else {
                // Save new setting
                if (businessLogo != null && !businessLogo.isEmpty()) {
                    String fileName = businessLogo.getOriginalFilename();
                    String randomId = UUID.randomUUID().toString();
                    String newFileName = randomId.concat(fileName.substring(fileName.lastIndexOf(".")));
                    String newFilePath = path + File.separator + newFileName;

                    Files.copy(businessLogo.getInputStream(), Paths.get(newFilePath));
                    settingMaster.setBusinessLogo(newFileName);
                }

                return settingMasterRepository.save(settingMaster);
            }
        } catch (IOException e) {
            System.err.println("File handling error: " + e.getMessage());
            throw e;
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to update setting", e);
        }
    }

    @Override
    public ResponseEntity<?> getSettingById(Long settingId) {
        Optional<SettingMaster> bankDetailsOpt = settingMasterRepository.findById(settingId);

        if (bankDetailsOpt.isPresent()) {
            return ResponseEntity.ok(bankDetailsOpt.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("BankDetails with ID " + settingId + " not found.");
        }
    }
}
