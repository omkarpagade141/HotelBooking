import React from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import './CustTabAllCss.css'

function ViewCustomerProfile({ customerData }) {
  return (
    <div>
       <Row  >
        <Col md={3} style={{height:'100%' }}>
        {
          (customerData && customerData.photo!==null)  ? 
        <img src={`http://localhost:8080/api/images/${customerData.photo}`}
        style={{width:'100%'}}
        alt="customer image" />
        : 
          <p>no profile photo added</p>
        }
       
        </Col>
        <Col md={9} style={{fontSize:'18px'}}>
        <Table bordered className='customerViewProfileTable'>
          <tbody>
          <tr>
            <th>Customer Name:</th>
            <td>{customerData ?customerData.fullName : ''}</td>
          </tr>
          <tr>
            <th>Customer Email:</th>
            <td>{customerData ?customerData.email : ''}</td>
          </tr>
          <tr>
            <th>Customer Mobile Number:</th>
            <td>{customerData ?customerData.mobileNumber : ''}</td>
          </tr>
          <tr>
            <th>Customer Address:</th>
            <td>{customerData ?customerData.address : ''}</td>
          </tr>
          <tr>
            <th>Customer Locality:</th>
            <td>{customerData ?customerData.locality : ''}</td>
          </tr>
          <tr>
            <th>Customer pin code:</th>
            <td>{customerData ?customerData.pincode : ''}</td>
          </tr>
          <tr>
            <th>Customer City:</th>
            <td>{customerData ?customerData.city : ''}</td>
          </tr>
          </tbody>
        </Table>
        </Col>
       </Row>
    </div>
  )
}

export default ViewCustomerProfile
