import React from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import './CustTabAllCss.css'

function ViewCustomerProfile({ customerData }) {
  return (
    <div>
       <Row>
        <Col md={3} style={{height:'200px'}}>
        <img src="" alt="customer image" />
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
