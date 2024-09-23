package com.HotelBooking.HotelBooking.Controller;

import com.HotelBooking.HotelBooking.Entity.SettingMaster;
import com.HotelBooking.HotelBooking.Service.SettingMasterService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/settings")
@CrossOrigin("*")
public class SettingMasterController {

    @Autowired
    SettingMasterService settingMasterService;

    private Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);


    @PutMapping("/addOrUpdate-setting")
    public ResponseEntity<String> updateSetting(@RequestPart("settingObj") SettingMaster settingMaster,
                                                @RequestParam("image") MultipartFile logoImage
    ) {

        try {

           // logger.info("New token issued: {}", newToken)

            System.out.println("IN UPDATE-SETTING METHOD-$$$-1");

            settingMasterService.updateSetting(settingMaster, logoImage);
            System.out.println("IN UPDATE-SETTING METHOD-$$$-2");
            return ResponseEntity.ok("Setting Updated successfully with logo.");

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to Update setting with logo.");
        }
    }

    @GetMapping("/get-setting/{settingId}")
    public ResponseEntity<?> getSetting(@PathVariable Long settingId) {
        return settingMasterService.getSettingById(settingId);
    }

}
