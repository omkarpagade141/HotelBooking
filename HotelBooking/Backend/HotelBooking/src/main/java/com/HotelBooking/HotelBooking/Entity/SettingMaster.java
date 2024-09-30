package com.HotelBooking.HotelBooking.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "settings")
public class SettingMaster {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long settingId;
    String companyName;
    String address;
    String city;
    String phoneNumber;
    String email;
    String businessLogo;

    public SettingMaster() {
        super();
    }

    public SettingMaster(Long settingId, String companyName, String address, String city, String phoneNumber, String email, String businessLogo) {
        this.settingId = settingId;
        this.companyName = companyName;
        this.address = address;
        this.city = city;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.businessLogo = businessLogo;
    }

    public Long getSettingId() {
        return settingId;
    }

    public void setSettingId(Long settingId) {
        this.settingId = settingId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBusinessLogo() {
        return businessLogo;
    }

    public void setBusinessLogo(String businessLogo) {
        this.businessLogo = businessLogo;
    }

    @Override
    public String toString() {
        return "SettingMaster{" +
                "settingId=" + settingId +
                ", companyName='" + companyName + '\'' +
                ", address='" + address + '\'' +
                ", city='" + city + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", email='" + email + '\'' +
                ", businessLogo='" + businessLogo + '\'' +
                '}';
    }
}
