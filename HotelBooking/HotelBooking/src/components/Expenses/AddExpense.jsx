import { Row, Col, Card, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import apiClient from "../APIClient";

function AddExpense() {

  const handleAddExpense = async(e)=> {
    e.preventDefault();

    const sendingData = {
      "expAmount": "34235",
      "expType": "UPI",
      "expDate": "2024-09-19",
      "expNote": "11111expense list"
    };
    const formFata= new FormData()
    try {
      // const response = apiClient.post()


    } catch (error) {
      console.log(error);

    }
  }

  return (
    <Row>
      <Col xs md={2}></Col>
      <Col xs md={8}>
        <Card>
          <Card.Body style={{ padding: "35px", fontSize: "18px" }}>
            <h3 style={{ marginLeft: "12px" }}>Add Expense</h3>
            <hr />

            <Form onSubmit={(e) => handleAddExpense(e)}>
              <Row>
                <Col xs md={4} style={{ textAlign: "start" }}>
                  <strong>Expense Amount (in Rs):</strong>
                </Col>
                <Col xs md={8}>
                  <Form.Control
                    type="text"
                    placeholder="Add Expense in Amount in(Rs)"
                    style={{ marginBottom: "20px", padding: "5px" }}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs md={4} style={{ textAlign: "start" }}>
                  <strong>Expense Type:</strong>
                </Col>
                <Col xs md={8}>
                  <Form.Control
                    type="text"
                    placeholder="Expense Type"
                    style={{ marginBottom: "20px", padding: "5px" }}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs md={4} style={{ textAlign: "start" }}>
                  <strong>Expense Date:</strong>
                </Col>
                <Col xs md={8}>
                  <Form.Control
                    type="date"
                    placeholder="Content Title"
                    style={{ marginBottom: "20px", padding: "5px" }}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs md={4} style={{ textAlign: "start" }}>
                  <strong>Note :</strong>
                </Col>
                <Col xs md={8}>
                  <Form.Control
                    as="textarea"
                    placeholder="Note"
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
                    style={{ marginBottom: "20px", padding: "4px" }}
                  />
                </Col>
              </Row>
              <hr />
              <Row>
                <Col xs md={6}>
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "#1861bf",
                      marginLeft: "50%",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      style={{ marginRight: "15px" }}
                    />
                    <strong>Submit</strong>
                  </Button>
                </Col>
                <Col xs md={6}>
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "gray",
                      borderColor: "gray",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      style={{ marginRight: "15px" }}
                    />
                    <strong>Clear</strong>
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

export default AddExpense;
