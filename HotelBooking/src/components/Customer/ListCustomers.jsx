import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiClient from "../APIClient";


function ListCustomers() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage, setCustomersPerPage] = useState(5);

  const fetchCustomers = async () => {
    const response = await apiClient.get('http://localhost:8080/api/customer');
    if (response.status === 200) {
      setCustomers(response.data);
    }
  };

  const handleDeleteCustomer= async(custID)=>{
    try {
      const response= await apiClient.delete(`http://localhost:8080/api/customer/${custID}`)
      if(response.status===200){
        toast.success("Customer deleted successfully");
      }
    } catch (error) {
      toast.error("Error deleting customer");
      console.log(error);
      
      
    }
  }
  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleViewCustomer = (id) => {
    navigate(`/home/viewCustomer/${id}`);
  };

  const handleEntriesChange = (e) => {
    setCustomersPerPage(e.target.value);
    setCurrentPage(1); // Reset to first page on entries change
  };

  // Logic for displaying current customers
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  // Change page
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Total pages and entries calculations
  const totalEntries = customers.length;
  const totalPages = Math.ceil(totalEntries / customersPerPage);
  const startIndex = indexOfFirstCustomer;

  return (
    <div>
      <Row>
        <Col md={12}>
          <Card>
            <Card.Body style={{ padding: "30px", fontSize: "16px" }}>
              <h3>List of Customers</h3> <hr />
              <Row style={{ fontSize: "18px" }}>
                <Col xs md={9}>
                  <div>
                    <span>Show </span>
                    <select onChange={handleEntriesChange} value={customersPerPage} style={{ width: "50px" }}>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                    </select>
                    <span> Entries</span>
                  </div>
                </Col>
                <Col xs md={3} style={{ fontSize: "18px", marginBottom: "15px" }}>
                  <input type="text" placeholder="Search" style={{ width: "100%", padding: "4px" }} />
                </Col>
              </Row>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th style={{ width: '28%' }}>Customer Name</th>
                    <th style={{ width: '22%' }}>Phone Number</th>
                    <th style={{ width: '25%' }}>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCustomers.map((customer) => (
                    <tr key={customer.customerId}>
                      <td>{customer.fullName}</td>
                      <td>{customer.mobileNumber}</td>
                      <td>{customer.email}</td>
                      <td>
                        <Button style={{ height: '30px' }} onClick={() => handleViewCustomer(customer.customerId)}>View</Button>
                        <Button style={{ height: '30px', backgroundColor: '#cb4a4a', marginLeft: '15px', border: 'none' }}
                        onClick={() => handleDeleteCustomer(customer.customerId)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Info */}
              <div>
                <Row>
                  <Col xs md={9} style={{ fontSize: "17px" }}>
                    <p>Showing {startIndex + 1} to {Math.min(indexOfLastCustomer, totalEntries)} of {totalEntries} entries</p>
                  </Col>
                  <Col xs md={3} style={{ fontSize: "17px", textAlign: "end" }}>
                    <Pagination>
                      <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                      {Array.from({ length: totalPages }, (_, i) => {
                        const page = i + 1;
                        if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                          return (
                            <Pagination.Item key={page} active={page === currentPage} onClick={() => handlePageChange(page)}>
                              {page}
                            </Pagination.Item>
                          );
                        }
                        if (page === currentPage - 2 || page === currentPage + 2) {
                          return <Pagination.Ellipsis key={page} />;
                        }
                        return null;
                      })}
                      <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                    </Pagination>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ListCustomers;
