package com.HotelBooking.HotelBooking.Entity;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.*;

@Entity
public class SectionMaster {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long sectionId;
    String name;
    LocalDate createdOn;

<<<<<<< HEAD
    @OneToMany(mappedBy = "section", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ContentMaster> contentMasterList;

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

=======
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

>>>>>>> 1a5387f2c4a7f46bb25737112ff68e1730756279
    public void setCreatedOn(LocalDate localDate) {
        this.createdOn = localDate;
    }

}
