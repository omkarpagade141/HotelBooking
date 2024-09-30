import React, { useEffect } from 'react'
import { Card, Col, Row, Table } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import apiClient from '../APIClient';

function ViewBooking() {
  const { BookingId } = useParams();
  const [booking, setBooking] = React.useState(null);
  const [bookingItems, setBookingItems] = React.useState( []);
  useEffect(() => {
    const fetchbook = async (BookingId) => {
      const response = await apiClient.get(`http://localhost:8080/api/Booking/${BookingId}`)
      if (response.status === 200) {
        setBooking(response.data)
        setBookingItems(response.data.itemList)
        console.log(response.data);

      }
    }
    fetchbook(BookingId)
  }, [BookingId])
  return (
    <div>
      <Card>
        <Card.Body>
          <h2>Booking Details</h2><hr />
          <Row>
            <Col md={6}>
              <Table bordered>
                <tbody>
                  <tr>
                    <td><strong>Customer Name:</strong></td>
                    <td> { booking ? booking.customer.fullName : ''}</td>
                  </tr>
                  <tr>
                    <td><strong>Mobile Number:</strong></td>
                    <td> {booking ? booking.customer.mobileNumber : ''}</td>
                  </tr>
                  <tr>
                    <td><strong>  Email:</strong></td>
                    <td> {booking ? booking.customer.email : ''}</td>
                  </tr>
                  <tr>
                    <td><strong>  Address:</strong></td>
                    <td> {booking ? booking.customer.address : ''}</td>
                  </tr>
                  <tr>
                    <td><strong>  Locality:</strong></td>
                    <td> {booking ? booking.customer.locality : ''}</td>
                  </tr>
                  <tr>
                    <td><strong>  City:</strong></td>
                    <td> {booking ? booking.customer.pincode + ',   ' + booking.customer.city : ''}</td>
                  </tr>
                </tbody>
              </Table>


            </Col>
            <Col md={6}>
              <Table bordered>
                <tbody>
                  <tr>
                    <td><strong>  Booking Id:</strong></td>
                    <td> {booking ? booking.bookingId : ''}</td>
                  </tr>
                  <tr>
                    <td><strong>Check-In Date:</strong></td>
                    <td> {booking ? booking.checkInDate : ''}</td>
                  </tr>
                  <tr>
                    <td><strong>Check-In Time:</strong></td>
                    <td> {booking ? booking.checkInTime : ''}</td>
                  </tr>
                  <tr>
                    <td><strong>Check-Out Date:</strong></td>
                    <td> {booking ? booking.checkOutDate : ''}</td>
                  </tr>
                  <tr>
                    <td><strong>  Check-Out Time:</strong></td>
                    <td> {booking ? booking.checkOutTime : ''}</td>
                  </tr>
                  <tr>
                    <td><strong>  Total Amount:</strong></td>
                    <td> {booking ? booking.invoiceamount : ''}</td>
                  </tr>

                </tbody>
              </Table>
            </Col>
            <hr />
          </Row>
          <Row>
            <h3>Items</h3>
            <Table bordered>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Item Price</th>
                  <th>Item Quantity</th>
                  <th>Item Description</th>
                </tr>
              </thead>
              <tbody>
                 {bookingItems ? 
                 bookingItems.map( item=>(
                  <tr key={item.itemId}>
                    <td>{item.itemName}</td>
                    <td>{item.itemPrice}</td>
                    <td>{item.itemQuantity}</td>
                    <td>{item.itemDescription}</td>

                  </tr>
                 ) )
                 :
                 ''}
              </tbody>
            </Table>
          </Row>
        </Card.Body>
      </Card>
    </div>
  )
}

export default ViewBooking
