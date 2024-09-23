import { Row, Col, Card, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import apiClient from "../APIClient";

function AddContent() {
  const [sections, setSections] = useState([]);
  const [image, setImage] = useState(null);
  const [contentTitle, setContentTitle] = useState('');
  const [contentPrice, setContentPrice] = useState('');
  const [contentSequence, setContentSequence] = useState('');
  const [contentDescription, setContentDescription] = useState('');
  const [contentLocation, setContentLocation] = useState('');
  const [contentLink, setContentLink] = useState('');
  const [sectionId, setSectionId] = useState('');
  const [contentImgAltTag, setContentImgAltTag] = useState('');

  const fetchSections = async () => {
    const response = await apiClient.get('/api/section');
    setSections(response.data);
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleAddContent = async (e) => {
    e.preventDefault();
    const formdata = new FormData();

    const contentData = {
      contentTitle,
      contentPrice,
      contentSequence,
      contentImgAltTag,
      contentDescription,
      contentLocation,
      contentLink,
      section: { sectionId },
    };

    // Append JSON blob
    formdata.append('content', new Blob([JSON.stringify(contentData)], { type: 'application/json' }));
    formdata.append('image', image);

    try {
      const response = await apiClient.post('/api/content', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        toast.success('Content added successfully');
        
        // Reset all state variables to initial values
        setContentTitle('');
        setContentPrice('');
        setContentSequence('');
        setContentDescription('');
        setContentLocation('');
        setContentLink('');
        setSectionId('');
        setImage(null);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to add content');
    }
  };

  return (
    <Row>
      <Col xs md={2}></Col>
      <Col xs md={8}>
        <Card>
          <Card.Body style={{ padding: "50px", fontSize: "16px" }}>
            <h3 style={{ marginLeft: "12px" }}>Add Content</h3>
            <hr />

            <Form onSubmit={handleAddContent}>
              <Row>
                <Col xs md={4} style={{ textAlign: "start" }}>
                  <strong>Select Section:</strong>
                </Col>
                <Col xs md={8}>
                  <Form.Select
                    id="section"
                    style={{ marginBottom: "20px", padding: "5px" }}
                    value={sectionId}
                    onChange={(e) => setSectionId(e.target.value)}
                  >
                    <option value="">Select a section</option>
                    {sections.map(section => (
                      <option key={section.sectionId} value={section.sectionId}>
                        {section.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>

              <Row>
                <Col xs md={4} style={{ textAlign: "start" }}>
                  <strong>Content Title:</strong>
                </Col>
                <Col xs md={8}>
                  <Form.Control
                    type="text"
                    placeholder="Content Title"
                    value={contentTitle}
                    onChange={(e) => setContentTitle(e.target.value)}
                    style={{ marginBottom: "20px", padding: "5px" }}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs md={4} style={{ textAlign: "start" }}>
                  <strong>Content Charges/Price/Cost:</strong>
                </Col>
                <Col xs md={8}>
                  <Form.Control
                    type="text"
                    placeholder="Content Charges/Price/Cost"
                    value={contentPrice}
                    onChange={(e) => setContentPrice(e.target.value)}
                    style={{ marginBottom: "35px", padding: "4px" }}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs md={4} style={{ textAlign: "start" }}>
                  <strong>Content Sequence:</strong>
                </Col>
                <Col xs md={8}>
                  <Form.Control
                    type="text"
                    placeholder="Content sequence"
                    value={contentSequence}
                    onChange={(e) => setContentSequence(e.target.value)}
                    style={{ marginBottom: "20px", padding: "4px" }}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs md={4} style={{ textAlign: "start" }}>
                  <strong>Content Img Alt Tag:</strong>
                </Col>
                <Col xs md={8}>
                  <Form.Control
                    type="text"
                    placeholder="Content Img Alt Tag"
                    value={contentImgAltTag}
                    onChange={(e) => setContentImgAltTag(e.target.value)}
                    style={{ marginBottom: "20px", padding: "4px" }}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs md={4} style={{ textAlign: "start" }}>
                  <strong>Content Description:</strong>
                </Col>
                <Col xs md={8}>
                  <Form.Control
                    as="textarea"
                    placeholder="Content Description"
                    value={contentDescription}
                    onChange={(e) => setContentDescription(e.target.value)}
                    style={{ marginBottom: "20px", padding: "4px" }}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs md={4} style={{ textAlign: "start" }}>
                  <strong>Location:</strong>
                </Col>
                <Col xs md={8}>
                  <Form.Control
                    type="text"
                    placeholder="Location"
                    value={contentLocation}
                    onChange={(e) => setContentLocation(e.target.value)}
                    style={{ marginBottom: "20px", padding: "4px" }}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs md={4} style={{ textAlign: "start" }}>
                  <strong>Add Link:</strong>
                </Col>
                <Col xs md={8}>
                  <Form.Control
                    type="text"
                    placeholder="Add Link"
                    value={contentLink}
                    onChange={(e) => setContentLink(e.target.value)}
                    style={{ marginBottom: "20px", padding: "4px" }}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs md={4} style={{ textAlign: "start" }}>
                  <strong>Image:</strong>
                </Col>
                <Col xs md={8}>
                  <Form.Control
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    style={{ marginBottom: "20px", padding: "4px" }}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs md={4}></Col>
                <Col xs md={8}>
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "#1861bf",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      style={{ marginRight: "15px" }}
                    />
                    <strong>Submit</strong>
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col xs md={2}></Col>
    </Row>
  );
}

export default AddContent;
