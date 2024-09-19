import { Row, Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function AddContent() {
  return (
    <Row>
      <Col xs md={3}></Col>
      <Col xs md={6}>
        <Card>
          <Card.Body style={{ padding: "50px", fontSize: "18px" }}>
            <h3 style={{ marginLeft: "12px" }}>Add Content</h3>
            <hr />

            <Row>
              <Col xs md={3} style={{ textAlign: "start" }}>
                <strong>Select Title : </strong>
              </Col>
              <Col xs md={9}>
                <input
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    padding: "5px",
                  }}
                  type="text "
                  value=""
                  placeholder="Section Title"
                />
              </Col>
            </Row>
            <Row>
              <Col xs md={3} style={{ textAlign: "start" }}>
                <strong>Content Title:</strong>
              </Col>
              <Col xs md={9}>
                <input
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    padding: "5px",
                  }}
                  type="text "
                  value=""
                  placeholder="Content Title"
                />
              </Col>
            </Row>
            <Row>
              <Col xs md={3} style={{ textAlign: "Start" }}>
                <strong>Content Charges/Price/Cost:</strong>
              </Col>
              <Col xs md={9}>
                <input
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    padding: "4px",
                  }}
                  type="text "
                  value=""
                  placeholder="Content Charges/Price/Cost"
                />
              </Col>
            </Row>
            <Row>
              <Col xs md={3} style={{ textAlign: "start" }}>
                <strong>Content Img Alt Tag:</strong>
              </Col>
              <Col xs md={9}>
                <input
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    padding: "4px",
                  }}
                  type="text "
                  value=""
                  placeholder="Content Img Alt Tag"
                />
              </Col>
            </Row>
            <Row>
              <Col xs md={3} style={{ textAlign: "start" }}>
                <strong>Content Description :</strong>
              </Col>
              <Col xs md={9}>
                <textarea
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    padding: "4px",
                  }}
                  type="text "
                  value=""
                  placeholder="Content Description"
                />
              </Col>
            </Row>
            <Row>
              <Col xs md={3} style={{ textAlign: "start" }}>
                <strong>Date :</strong>
              </Col>
              <Col xs md={9}>
                <input
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    padding: "4px",
                  }}
                  type="date"
                  value=""
                  placeholder="DD-MM-YYYY"
                />
              </Col>
            </Row>

            <Row>
              <Col xs md={3} style={{ textAlign: "start" }}>
                <strong>Location :</strong>
              </Col>
              <Col xs md={9}>
                <input
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    padding: "4px",
                  }}
                  type="text"
                  value=""
                  placeholder="Location"
                />
              </Col>
            </Row>
            <Row>
              <Col xs md={3} style={{ textAlign: "start" }}>
                <strong>Add Link:</strong>
              </Col>
              <Col xs md={9}>
                <input
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    padding: "4px",
                  }}
                  type="text"
                  value=""
                  placeholder="Add Link"
                />
              </Col>
            </Row>
            <Row>
              <Col xs md={3} style={{ textAlign: "start" }}>
                <strong>Image : </strong>
              </Col>
              <Col xs md={9}>
                <input
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    padding: "4px",
                  }}
                  type="file"
                  value=""
                />
              </Col>
            </Row>
            <Row>
              <Col xs md={3}></Col>
              <Col xs md={9}>
                <Button
                  style={{
                    fontsize: "120px ",
                    backgroundColor: "#1861bf",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    style={{ marginRight: "15px" }}
                  />
                  <strong>Submit </strong>
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>

      <Col xs md={3}></Col>
    </Row>
  );
}

export default AddContent;
