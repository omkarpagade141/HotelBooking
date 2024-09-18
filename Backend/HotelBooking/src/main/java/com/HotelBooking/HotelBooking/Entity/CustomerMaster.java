package com.HotelBooking.HotelBooking.Entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class CustomerMaster {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long customerId;
	String fullName;
	String mobileNumber;
	String email;
	String buildingFlatNumber;
	String locality;
	String city;
	String pincode;
	String photo;
	@Column(nullable = false)
	LocalDate AddedOn;

	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getBuildingFlatNumber() {
		return buildingFlatNumber;
	}

	public void setBuildingFlatNumber(String buildingFlatNumber) {
		this.buildingFlatNumber = buildingFlatNumber;
	}

	public String getLocality() {
		return locality;
	}

	public void setLocality(String locality) {
		this.locality = locality;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}
	

	public LocalDate getAddedOn() {
		return AddedOn;
	}

	public void setAddedOn(LocalDate localDate) {
		AddedOn = localDate;
	}

	@Override
	public String toString() {
		return "CustomerMaster [customerId=" + customerId + ", fullName=" + fullName + ", mobileNumber=" + mobileNumber
				+ ", email=" + email + ", buildingFlatNumber=" + buildingFlatNumber + ", locality=" + locality
				+ ", city=" + city + ", pincode=" + pincode + ", photo=" + photo + "]";
	}

}
