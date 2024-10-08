package com.HotelBooking.HotelBooking.Entity;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
public class ContentMaster {

	  @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long contentId;

	    private String contentTitle;
	    private Double contentPrice;  // or BigDecimal for more precise currency handling
	    private String contentSequence;
	    private String contentDescription;
	    private String contentImgAltTag;
	    private LocalDate contentDate;
	    private String contentLocation;
	    private String contentLink;
	    private String contentImage;


	    @ManyToOne(cascade = CascadeType.ALL )
	    @JoinColumn(name = "section_id", nullable = false)
	    private SectionMaster section;	
				
	    

		public ContentMaster(Long contentId, String contentTitle, Double contentPrice, String contentSequence,
				String contentDescription, String contentImgAltTag, LocalDate contentDate, String contentLocation,
				String contentLink, String contentImage,  SectionMaster section) {
			super();
			this.contentId = contentId;
			this.contentTitle = contentTitle;
			this.contentPrice = contentPrice;
			this.contentSequence = contentSequence;
			this.contentDescription = contentDescription;
			this.contentImgAltTag = contentImgAltTag;
			this.contentDate = contentDate;
			this.contentLocation = contentLocation;
			this.contentLink = contentLink;
			this.contentImage = contentImage;
			this.section = section;
		}



		public ContentMaster() {
			super();
			
			// TODO Auto-generated constructor stub
		}
		
		

		public String getContentImgAltTag() {
			return contentImgAltTag;
		}



		public void setContentImgAltTag(String contentImgAltTag) {
			this.contentImgAltTag = contentImgAltTag;
		}



		public Long getContentId() {
			return contentId;
		}

		public void setContentId(Long contentId) {
			this.contentId = contentId;
		}

		public String getContentTitle() {
			return contentTitle;
		}

		public void setContentTitle(String contentTitle) {
			this.contentTitle = contentTitle;
		}

		public Double getContentPrice() {
			return contentPrice;
		}

		public void setContentPrice(Double contentPrice) {
			this.contentPrice = contentPrice;
		}

		public String getContentSequence() {
			return contentSequence;
		}

		public void setContentSequence(String contentSequence) {
			this.contentSequence = contentSequence;
		}

		public String getContentDescription() {
			return contentDescription;
		}

		public void setContentDescription(String contentDescription) {
			this.contentDescription = contentDescription;
		}

		public LocalDate getContentDate() {
			return contentDate;
		}

		public void setContentDate(LocalDate contentDate) {
			this.contentDate = contentDate;
		}

		public String getContentLocation() {
			return contentLocation;
		}

		public void setContentLocation(String contentLocation) {
			this.contentLocation = contentLocation;
		}

		public String getContentLink() {
			return contentLink;
		}

		public void setContentLink(String contentLink) {
			this.contentLink = contentLink;
		}

		public String getContentImage() {
			return contentImage;
		}

		public void setContentImage(String contentImage) {
			this.contentImage = contentImage;
		}

		public SectionMaster getSection() {
			return section;
		}
		
		public void setSection(SectionMaster section) {
			this.section = section;
		}
		
		

		



		@Override
		public String toString() {
			return "ContentMaster [contentId=" + contentId + ", contentTitle=" + contentTitle + ", contentPrice="
					+ contentPrice + ", contentSequence=" + contentSequence + ", contentDescription="
					+ contentDescription + ", contentImgAltTag=" + contentImgAltTag + ", contentDate=" + contentDate
					+ ", contentLocation=" + contentLocation + ", contentLink=" + contentLink + ", contentImage="
					+ contentImage + ", section=" + section + "]";
		}



		
	    
	    
	    

	    
}
