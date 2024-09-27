import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Card, Button, Table, Dropdown, Pagination } from "react-bootstrap";
import { toast } from 'react-toastify';
import axios from 'axios';
import apiClient from "../APIClient";
import {
  Modal,
  TextField,
} from '@mui/material';

function Section() {
  const [sectionName, setSectionName] = useState('');
  const [sections, setSections] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editSectionId, setEditSectionId] = useState(null);
  
  const handleAddSection = async () => {
    if (sectionName === '') {
      toast.error('Please enter a section name');
      return;
    }
    try {
      const response = await apiClient.post('/api/section', { name: sectionName });
      if (response.status === 201) {
        fetchSections();
        setSectionName('');
        toast.success("Section added Successfully");
      } else {
        toast.error("Failed to add section");
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleDeleteSection = async (id) => {
    const isConfirmed = confirm("Deleting this section will also delete content under this section");
    if (isConfirmed) {
      const response = await apiClient.delete(`/api/section/${id}`);
      if (response.status === 200) {
        fetchSections();
        toast.success("Section deleted Successfully");
      } else {
        toast.error("Failed to delete section");
      }
    }
  };

  const fetchSections = async () => {
    const response = await apiClient.get('/api/section');
    setSections(response.data);
  };

  useEffect(() => {
    fetchSections();
  }, []);

  // Edit section handler
  const handleEditSection = async () => {
    if (sectionName === '') {
      toast.error('Please enter a section name');
      return;
    }
    try {
      const response = await apiClient.put(`/api/section/${editSectionId}`, { name: sectionName });
      if (response.status === 200) {
        fetchSections();
        setEditModalOpen(false);
        setSectionName('');
        toast.success("Section updated Successfully");
      } else {
        toast.error("Failed to update section");
      }
    } catch (error) {
      console.log(error);
      
      toast.error(error.response.data);
    }
  };

  const handleOpenEditModal = (section) => {
    setSectionName(section.name);
    setEditSectionId(section.sectionId);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSectionName('');
    setEditSectionId(null);
  };

  // Pagination logic
  const totalPages = Math.ceil(sections.length / itemsPerPage);
  const indexOfLastSection = currentPage * itemsPerPage;
  const indexOfFirstSection = indexOfLastSection - itemsPerPage;
  const currentSections = sections.slice(indexOfFirstSection, indexOfLastSection);

  return (
    <div>
      <Row>
        <Col xs md={5}>
          <Card>
            <Card.Body>
              <h3 style={{ marginLeft: "12px" }}>Add Section</h3>
              <hr />
              <Row>
                <Col xs md={12}>
                  <input
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                    style={{ width: '100%', marginBottom: "20px", padding: "4px" }}
                    type="text"
                    placeholder="Add Section"
                  />
                </Col>
              </Row>
              <Button onClick={handleAddSection} style={{ fontSize: "15px", backgroundColor: "#1861bf" }}>
                <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: "5px" }} />
                Submit
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs md={7}>
          <Card>
            <h3 style={{ marginLeft: "18px", marginTop: "15px" }}>List of Sections</h3>
            <hr />
            <Card.Body>
              <Row style={{ marginBottom: "15px", fontSize: "18px" }}>
                <Col xs md={6}>
                  <div>
                    <span>Show </span>
                    <select style={{ width: "60px" }} onChange={(e) => setItemsPerPage(e.target.value)}>
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                      <option value={20}>20</option>
                      <option value={30}>30</option>
                      <option value={40}>40</option>
                      <option value={50}>50</option>
                    </select>
                    <span> Entries</span>
                  </div>
                </Col>
                <Col xs md={6} style={{ fontSize: "18px" }}>
                  <input type="text" placeholder="Search" style={{ width: '100%' }} />
                </Col>
              </Row>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <Table striped bordered hover style={{ textAlign: "center", padding: "8px" }}>
                  <thead>
                    <tr>
                      <th>Section Id</th>
                      <th>Section Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSections.map(section => (
                      <tr key={section.sectionId}>
                        <td>{section.sectionId}</td>
                        <td>{section.name}</td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle style={{ height: '30px', backgroundColor: '#1861bf' }}>
                              Action
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => handleOpenEditModal(section)}>Edit</Dropdown.Item>
                              {/* <Dropdown.Item onClick={() => handleDeleteSection(section.sectionId)}>Delete</Dropdown.Item> */}
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
            <div>
              <Row>
                <Col xs md={8} style={{ fontSize: "17px" }}>
                  <p style={{ marginLeft: '20px' }}>Showing {indexOfFirstSection + 1} to {Math.min(indexOfLastSection, sections.length)} of {sections.length} entries</p>
                </Col>
                <Col xs md={4} style={{ fontSize: "17px", textAlign: "end" }}>
                  <Pagination>
                    <Pagination.Prev onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} />
                    {Array.from({ length: totalPages }, (_, i) => (
                      (i + 1 >= currentPage - 1 && i + 1 <= currentPage + 1) && (
                        <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>
                          {i + 1}
                        </Pagination.Item>
                      )
                    ))}
                    <Pagination.Next onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)} />
                  </Pagination>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Edit Modal */}
      <Modal open={editModalOpen} onClose={handleCloseEditModal}>
        <div style={{ padding: '20px', backgroundColor: 'white', margin: '50px auto', borderRadius: '8px', maxWidth: '400px' }}>
          <h2>Edit Section Name</h2>
          <TextField
            label="Section Name"
            variant="outlined"
            fullWidth
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
            style={{ marginBottom: '20px' }}
          />
          <Row>
            <Col xs md={4}> </Col>
            <Col xs md={4}>
            <Button onClick={handleEditSection} color="primary" style={{width:'100%'}}>
            Save
          </Button>
             </Col>
            <Col xs md={4}> </Col>
          </Row>
          
        </div>
      </Modal>
    </div>
  );
}

export default Section;
