import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import apiClient from '../APIClient';
import { toast } from 'react-toastify';

function EditContent() {
  const [sections, setSections] = useState([]);
  const [content, setContent] = useState({});
  const [image, setImage] = useState(null);
  const { contId } = useParams();

  const fetchSections = async () => {
    const response = await apiClient.get('/api/section');
    setSections(response.data);
  };

  const fetchContentById = async (contId) => {
    const response = await apiClient.get(`/api/content/${contId}`);
    setContent(response.data);
  };

  useEffect(() => {
    fetchContentById(contId);
    fetchSections();
  }, [contId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditContent = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('content', new Blob([JSON.stringify(content)], { type: 'application/json' }));
    formData.append('image', image);

    try {
      const response = await apiClient.put(`/api/content/${content.contentId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status===200) {
        toast.success('content updated successfully')
      }
    //   console.log(response.status);
    } catch (error) {
      console.error(error);
      // Optionally, handle the error (e.g., show a notification)
    }
  };

  return (
    <Row>
      <Col xs md={2}></Col>
      <Col xs md={8}>
        <Card>
          <Card.Body style={{ padding: "50px", fontSize: "16px" }}>
            <h3 style={{ marginLeft: "12px" }}>Update Content</h3>
            <hr />

            <Form onSubmit={handleEditContent}>
              <Row>
                <Col xs md={4} style={{ textAlign: "start" }}>
                  <strong>Select Section:</strong>
                </Col>
                <Col xs md={8}>
                  <Form.Select
                    name="sectionId"
                    value={content.sectionId || ''}
                    onChange={handleInputChange}
                    style={{ marginBottom: "20px", padding: "5px" }}
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
                    name="contentTitle"
                    value={content.contentTitle || ''}
                    onChange={handleInputChange}
                    placeholder="Content Title"
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
                    name="contentPrice"
                    value={content.contentPrice || ''}
                    onChange={handleInputChange}
                    placeholder="Content Charges/Price/Cost"
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
                    name="contentSequence"
                    value={content.contentSequence || ''}
                    onChange={handleInputChange}
                    placeholder="Content Sequence"
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
                    name="contentImgAltTag"
                    value={content.contentImgAltTag || ''}
                    onChange={handleInputChange}
                    placeholder="Content Img Alt Tag"
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
                    name="contentDescription"
                    value={content.contentDescription || ''}
                    onChange={handleInputChange}
                    placeholder="Content Description"
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
                    name="contentLocation"
                    value={content.contentLocation || ''}
                    onChange={handleInputChange}
                    placeholder="Location"
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
                    name="contentLink"
                    value={content.contentLink || ''}
                    onChange={handleInputChange}
                    placeholder="Add Link"
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
                    style={{ backgroundColor: "#1861bf" }}
                  >
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      style={{ marginRight: "15px" }}
                    />
                    <strong>Update</strong>
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

export default EditContent;
