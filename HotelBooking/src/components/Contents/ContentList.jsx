import { Row, Col, Card, Table, Dropdown, Pagination } from "react-bootstrap";

const ContentList = () => {
  return (
    <Row style={{ padding: "20px" }}>
      <Col xs md={12} style={{ padding: "8px" }}>
        <Card>
          <h3 style={{ marginLeft: "15px", marginTop: "5px" }}>
            List of Sections
          </h3>
          <hr />
          <Card.Body>
            <Row style={{ fontSize: "18px" }}>
              <Col xs md={9}>
                <div>
                  {" "}
                  <span>Show </span>
                  <select name="" id="" style={{ width: "50px" }}>
                    <option value="0">0</option>
                    <option value="0">5</option>
                    <option value="0">10</option>
                    <option value="0">15</option>
                    <option value="0">20</option>
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
              styel={{ textAlign: "center", padding: "15px", fontSize: "25px" }}
            >
              <thead style={{ fontSize: "20px" }}>
                <tr>
                  <th>Section Id</th>
                  <th>Content Id</th>
                  <th>Section Name</th>
                  <th>Content Title</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  /* {rows.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row._id}</td>
                    <td>{row.secName}</td>
                    <td>{row.conTitle}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="primary">
                          {row.Action}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>View</Dropdown.Item>
                          <Dropdown.Item>Edit</Dropdown.Item>
                          <Dropdown.Item>Edit</Dropdown.Item>
                          <Dropdown.Item>Add Photo</Dropdown.Item>
                          <Dropdown.Item>Add Video</Dropdown.Item>
                          <Dropdown.Item>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr> }
                ))}*/
                  <tr>
                    <td>1</td>
                    <td>Cost</td>
                    <td>101</td>
                    <td>120</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="primary">
                          Action
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>View</Dropdown.Item>
                          <Dropdown.Item>Edit</Dropdown.Item>
                          <Dropdown.Item>Edit</Dropdown.Item>
                          <Dropdown.Item>Add Photo</Dropdown.Item>
                          <Dropdown.Item>Add Video</Dropdown.Item>
                          <Dropdown.Item>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                }
                {/* <tr>
                  <td>1</td>
                  <td>Cost</td>
                  <td>101</td>
                  <td>120</td>
                  <td>
                    {" "}
                    <Dropdown>
                      <Dropdown.Toggle variant="primary">
                        Action
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>View</Dropdown.Item>
                        <Dropdown.Item>Edit</Dropdown.Item>
                        <Dropdown.Item>Edit</Dropdown.Item>
                        <Dropdown.Item>Add Photo</Dropdown.Item>
                        <Dropdown.Item>Add Video</Dropdown.Item>
                        <Dropdown.Item>Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Cost</td>
                  <td>101</td>
                  <td>120</td>
                  <td>
                    {" "}
                    <Dropdown>
                      <Dropdown.Toggle variant="primary">
                        Action
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>View</Dropdown.Item>
                        <Dropdown.Item>Edit</Dropdown.Item>
                        <Dropdown.Item>Edit</Dropdown.Item>
                        <Dropdown.Item>Add Photo</Dropdown.Item>
                        <Dropdown.Item>Add Video</Dropdown.Item>
                        <Dropdown.Item>Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Cost</td>
                  <td>101</td>
                  <td>120</td>
                  <td>
                    {" "}
                    <Dropdown>
                      <Dropdown.Toggle variant="primary">
                        Action
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>View</Dropdown.Item>
                        <Dropdown.Item>Edit</Dropdown.Item>
                        <Dropdown.Item>Edit</Dropdown.Item>
                        <Dropdown.Item>Add Photo</Dropdown.Item>
                        <Dropdown.Item>Add Video</Dropdown.Item>
                        <Dropdown.Item>Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Cost</td>
                  <td>101</td>
                  <td>120</td>
                  <td>
                    {" "}
                    <Dropdown>
                      <Dropdown.Toggle variant="primary">
                        Action
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>View</Dropdown.Item>
                        <Dropdown.Item>Edit</Dropdown.Item>
                        <Dropdown.Item>Edit</Dropdown.Item>
                        <Dropdown.Item>Add Photo</Dropdown.Item>
                        <Dropdown.Item>Add Video</Dropdown.Item>
                        <Dropdown.Item>Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Cost</td>
                  <td>101</td>
                  <td>120</td>
                  <td>
                    {" "}
                    <Dropdown>
                      <Dropdown.Toggle variant="primary">
                        Action
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>View</Dropdown.Item>
                        <Dropdown.Item>Edit</Dropdown.Item>
                        <Dropdown.Item>Edit</Dropdown.Item>
                        <Dropdown.Item>Add Photo</Dropdown.Item>
                        <Dropdown.Item>Add Video</Dropdown.Item>
                        <Dropdown.Item>Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Cost</td>
                  <td>101</td>
                  <td>120</td>
                  <td>
                    {" "}
                    <Dropdown>
                      <Dropdown.Toggle variant="primary">
                        Action
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>View</Dropdown.Item>
                        <Dropdown.Item>Edit</Dropdown.Item>
                        <Dropdown.Item>Edit</Dropdown.Item>
                        <Dropdown.Item>Add Photo</Dropdown.Item>
                        <Dropdown.Item>Add Video</Dropdown.Item>
                        <Dropdown.Item>Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Cost</td>
                  <td>101</td>
                  <td>120</td>
                  <td>
                    {" "}
                    <Dropdown>
                      <Dropdown.Toggle variant="primary">
                        Action
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>View</Dropdown.Item>
                        <Dropdown.Item>Edit</Dropdown.Item>
                        <Dropdown.Item>Edit</Dropdown.Item>
                        <Dropdown.Item>Add Photo</Dropdown.Item>
                        <Dropdown.Item>Add Video</Dropdown.Item>
                        <Dropdown.Item>Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>*/}
              </tbody>
            </Table>
            <div>
              <Row style={{}}>
                <Col
                  xs
                  md={9}
                  style={{
                    fontSize: "17px",
                  }}
                >
                  <p>showing 1 to 10 of 19 entries</p>
                </Col>
                <Col
                  xs
                  md={3}
                  style={{
                    fontSize: "17px",
                    textAlign: "end",
                  }}
                >
                  <Pagination>
                    <Pagination.Prev />
                    <Pagination.Ellipsis />
                    <Pagination.Item>{3}</Pagination.Item>
                    <Pagination.Item>{4}</Pagination.Item>
                    <Pagination.Item>{5}</Pagination.Item>
                    <Pagination.Ellipsis />
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
