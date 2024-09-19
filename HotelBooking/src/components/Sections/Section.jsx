import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTrash,faEdit,faSave } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Card, Button, Table } from "react-bootstrap";
import axios from 'axios'

 
function Section() {
  const [sectionName, setSectionName] = useState('')
  const [sections, setSections] = useState([])
  const [editingRow, setEditingRow] = useState(null)
  const [updatedSectionName, setUpdatedSectionName] = useState('')

  const handleAddSection = async () => {
    const response = await axios.post('http://localhost:8080/api/section', { "name": sectionName })

    if (response.status == 201) {
      fetchSections()
      alert("Section Added Successfully")

    }
  }

  const handleDeleteSection = async (id) => {
    const response = axios.delete(`http://localhost:8080/api/section/${id}`)

    if (response.s) {
      
    }
    fetchSections()
  }

  const fetchSections = async () => {
    const response = await axios.get('http://localhost:8080/api/section')
    setSections(response.data)
    //  console.log(response.data);

  }

  useEffect(() => {
    fetchSections()

  }, [])

  const handleEdit=async(section)=>{
    if (updatedSectionName=='') {
   await axios.put(`http://localhost:8080/api/section/${section.sectionId}`,{"name":section.name}) 
    fetchSections()
    setUpdatedSectionName('')
    setEditingRow(null)
    return;
    }

    await axios.put(`http://localhost:8080/api/section/${section.sectionId}`,{"name":updatedSectionName})
    fetchSections()
    setEditingRow(null)
    

  }
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
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                    style={{
                      width: '100%',
                      marginBottom: "20px",
                      padding: "4px",
                    }}
                    type="text "
                    placeholder="Add Section"
                  />
                </Col>
              </Row>

              <Button
                onClick={handleAddSection}
                style={{
                  fontsize: "120px ",
                  backgroundColor: "#1861bf"
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
                    style={{ width: '100%' }}
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sections.map(section => (
                    <tr key={section.sectionId}>
                      <td>{section.sectionId}</td>
                      {editingRow ? <input type="text" style={{width:'100%'}} defaultValue={section.name} 
                      onChange={(e)=>setUpdatedSectionName(e.target.value)} /> : <td>{section.name}</td> }
                      
                      <td>
                        <FontAwesomeIcon
                          icon={faTrash}

                          style={{ marginRight: "25px",cursor:'pointer' }}
                          onClick={() => handleDeleteSection(section.sectionId)}
                        />
                        {editingRow ?
                        <FontAwesomeIcon
                         
                         icon={faSave}
                         style={{ marginRight: "5px",cursor:'pointer' }}
                         onClick={() => handleEdit(section)}
                       />
                        :
                         <FontAwesomeIcon
                         
                         icon={faEdit}
                         style={{ marginRight: "5px",cursor:'pointer' }}
                         onClick={() => setEditingRow(section)}
                       /> }
                        
                        
                         
                      </td>
                    </tr>
                  ))}

                </tbody>
              </Table>
            </Card.Body>
            <div>
              <Row style={{ marginLeft: '10px' }}>
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
