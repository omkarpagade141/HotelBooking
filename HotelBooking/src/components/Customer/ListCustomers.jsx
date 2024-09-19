import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

function ListCustomers() {
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
                <th style={{width:'28%'}}>Customer Name</th>
                <th style={{width:'22%'}}>Phone Number</th>
                <th style={{width:'25%'}}>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
          </table>
        </Card.Body>

        </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ListCustomers
