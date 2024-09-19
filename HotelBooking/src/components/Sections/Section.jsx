import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Card, Button, Table } from "react-bootstrap";

// const sectionA = [
//   {
//     secId: 1,
//     secName: "asdfg",
//   },
//   {
//     secId: 2,
//     secName: "kjmhgn",
//   },
//   {
//     secId: 3,
//     secName: "jmghnh",
//   },
//   {
//     secId: 4,
//     secName: "yukyiiy",
//   },
// ];
function Section() {
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
                    style={{
                      width: "100%",
                      marginBottom: "20px",
                      padding: "4px",
                    }}
                    type="text "
                    value=""
                    placeholder="Add Section"
                  />
                </Col>
              </Row>

              <Button
                style={{
                  fontsize: "120px ",
                  backgroundColor: "#1861bf",
                }}
              >
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  style={{ marginRight: "5px" }}
                />
                Submit
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs md={7}>
          <Card>
            <h3 style={{ marginLeft: "18px", marginTop: "15px" }}>
              List of Sections
            </h3>
            <hr />
            <Card.Body>
              <Row style={{ marginBottom: "15px", fontSize: "18px" }}>
                <Col xs md={6}>
                  <div>
                    {" "}
                    <span>Show </span>
                    <select name="" id="" style={{ width: "60px" }}>
                      <option value="0">0</option>
                      <option value="0">10</option>
                      <option value="0">10</option>
                      <option value="0">10</option>
                      <option value="0">10</option>
                    </select>
                    <span> Entries</span>
                  </div>
                </Col>
                <Col xs md={6} style={{ fontSize: "18px" }}>
                  <input
                    type="text"
                    placeholder="Search"
                    style={{ width: "100%" }}
                  />
                </Col>
              </Row>

              <Table
                striped
                bordered
                hover
                styel={{ textAlign: "center", padding: "8px" }}
              >
                <thead>
                  <tr>
                    <th>Section Id</th>
                    <th>Section Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr></tr>
                  <tr>
                    <td>1</td>
                    <td>Cost</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Cost</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Cost</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Cost</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
            <div>
              <Row style={{ marginLeft: "10px" }}>
                <Col xs md={6} style={{ fontSize: "17px" }}>
                  <p>showing 1 to 10 of 19 entries</p>
                </Col>
                <Col xs md={6} style={{ fontSize: "17px" }}>
                  <span>Previous</span> 1 2{" "}
                  <span style={{ color: "blue" }}>Next</span>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Section;
