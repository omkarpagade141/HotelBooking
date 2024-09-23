package com.HotelBooking.HotelBooking.Entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class SectionMaster {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long sectionId;
    String name;
    LocalDate createdOn;

    public long getSectionId() {
        return sectionId;
    }

    public void setSectionId(long sectionId) {
        this.sectionId = sectionId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(LocalDate localDate) {
        this.createdOn = localDate;
    }

}
