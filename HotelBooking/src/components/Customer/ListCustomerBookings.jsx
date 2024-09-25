import { useEffect, useState } from "react";
import { Row, Col, Card, Table, Dropdown, Pagination } from "react-bootstrap";
import apiClient from "../APIClient";

const ContentList = () => {
  const [bookingList, setBookingList] = useState([]);
  const fetchAllBookings = async () => {
    const response = await apiClient.get('http://localhost:8080/api/Booking');
    if (response.status === 200) {
      setBookingList(response.data)
      console.log(response.data);

    }

  }
  useEffect(() => {
    fetchAllBookings()
  }, [])
  return (
    <Row style={{ padding: "20px" }}>
      <Col xs md={12} style={{ padding: "8px" }}>
        <Card>
          <h3 style={{ marginLeft: "15px", marginTop: "5px" }}>
            List of Bookings
          </h3>
          <hr />
          <Card.Body>
            <Row style={{ fontSize: "18px" }}>
              <Col xs md={9}>
                <div>
                  <span>Show </span>
                  <select style={{ width: "50px" }}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                  <span> Entries</span>
                </div>
              </Col>
              <Col xs md={3} style={{ fontSize: "18px", marginBottom: "15px" }}>
                <input
                  type="text"
                  placeholder="Search"
                  style={{ width: "100%", padding: "4px" }}
                />
              </Col>
            </Row>

            <Table
              striped
              bordered
              hover
              style={{ textAlign: "center", fontSize: "16px" }}
            >
              <thead style={{ fontSize: "16px" }}>
                <tr>
                  <th>Booking Id</th>
                  <th>Check-In Date </th>
                  <th>Check-In Time</th>
                  <th>Check-Out Date </th>
                  <th> Check-Out Time</th>
                  <th>Invoice</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookingList.map(booking => (
                  <tr key={booking.bookingId}>
                    <td>{booking.bookingId}</td>
                    <td>{booking.checkInDate}</td>
                    <td>{booking.checkInTime}</td>
                    <td>{booking.checkOutDate}</td>
                    <td>{booking.checkOutTime}</td>
                    <td>{booking.invoiceamount}</td>
                    <td>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="primary"
                        style={{ height: "30px" }}
                      >
                        Action
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>View</Dropdown.Item>
                        <Dropdown.Item>Edit</Dropdown.Item>
                        <Dropdown.Item>Add Photo</Dropdown.Item>
                        <Dropdown.Item>Add Video</Dropdown.Item>
                        <Dropdown.Item>Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>

                  </tr>
                ))}

                 
              </tbody>
            </Table>

            <div>
              <Row>
                <Col xs md={9} style={{ fontSize: "17px" }}>
                  <p>Showing to of entries</p>
                </Col>
                <Col xs md={3} style={{ fontSize: "17px", textAlign: "end" }}>
                  <Pagination>
                    <Pagination.Prev />

                    <Pagination.Next />
                  </Pagination>
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ContentList;
