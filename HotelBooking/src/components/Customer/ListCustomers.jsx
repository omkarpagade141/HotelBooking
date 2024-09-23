import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom';
import apiClient from '../APIClient';


function ListCustomers() {
  const nevigate = useNavigate() 


  const [customers, setCustomers] = useState([])

  const fetchCustomers = async () => {
    const response = await apiClient.get('http://localhost:8080/api/customer')
    if (response.status === 200) {
      setCustomers(response.data)
      console.log(response.data);

    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  const handleViewCustomer=(id)=>{
    nevigate(`/home/viewCustomer/${id}`)
    
  }

  return (
    <div>
      <Row>
        <Col md={12}>
          <Card>
            <Card.Body style={{ padding: "30px", fontSize: "16px" }}>
              <h3>List of Customers</h3> <hr />
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
                  {customers.map((customer, index) => (
                    <tr key={index}>
                      <td>{customer.fullName}</td>
                      <td>{customer.mobileNumber}</td>
                      <td>{customer.email}</td>
                      <td>
                        <Button style={{ height: '30px' }} onClick={()=>handleViewCustomer(customer.customerId)}>View</Button>
                        <Button style={{ height: '30px',backgroundColor:'#cb4a4a',marginLeft:'15px',border:'none' }}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card.Body>

          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ListCustomers
