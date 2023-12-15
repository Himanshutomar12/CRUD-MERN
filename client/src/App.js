import logo from './logo.svg';
import './App.css';
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from "axios"

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [project, setProject] = useState("");
  const url = "http://localhost:3001/";
  const [clientData, setClientData] = useState([]);
  const [showUpdateBtn, setShowUpdateBtn] = useState(false);
  const [uniqueId, setUniqueId] = useState("");

  useEffect(() => {
    getClient();
  }, []);

  const getClient = () => {
    axios.get(url)
      .then(res => setClientData(res.data))//)
      .catch(err => console.log(err));
  }

  const createClient = () => {
    if (firstName === "" || lastName === "" || emailId === "" || mobileNo === "" || project === "") {
      alert("Please fill all the fields");
    } else {
      const obj = {
        firstName: firstName,
        lastName: lastName,
        emailId: emailId,
        mobileNo: mobileNo,
        project: project
      }
      axios.post(url, obj)
        .then(res => {
          if (res.data.message === "1") {
            getClient();
            setFirstName("");
            setLastName("");
            setMobileNo("");
            setEmailId("");
            setProject("");
          }
        })
        .catch(err => console.log(err));
    }
  }

  const editClient = (id) => {
    axios.post(url + "find", { id: id })
      .then(res => {
        var obj = res.data[0];
        console.log(obj);
        setFirstName(obj.firstName);
        setLastName(obj.lastName);
        setEmailId(obj.emailId);
        setProject(obj.project);
        setMobileNo(obj.mobileNo);
        setShowUpdateBtn(true);
        setUniqueId(obj._id);
      })
      .catch(err => console.log(err));
  }

  const deleteClient = (id) => {
    axios.post(url + "delete", { id: id })
      .then(res => {
        if (res.data.msg === 1) {
          getClient();
        }
      })
      .catch(err => console.log(err));
  }

  const updateClient = () => {
    axios.post(url + "update", {
      id: uniqueId,
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      mobileNo: mobileNo,
      project: project
    })
      .then(res => {
        if (res.data.msg === 1) {
          getClient();
          setFirstName("");
          setLastName("");
          setMobileNo("");
          setEmailId("");
          setProject("");
          setUniqueId(0);
          setShowUpdateBtn(false);
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="App">
      <Container fluid>
        <Row className='header mb-3 p-2'>
          <Col>
            <h2>MERN ASSIGNMENT</h2>
          </Col>
        </Row>
        <Row>
          <Col className='col-md-9'>
            <h2>Clients</h2>
          </Col>
          <Col>
            <h2>{showUpdateBtn ? "Update" : "Create"} Client</h2>
          </Col>
        </Row>
        <Row>
          <Col className='col-md-9'>
            <Table responsive striped bordered>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Mobile No.</th>
                  <th>Project</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {
                  clientData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.emailId}</td>
                      <td>{item.mobileNo}</td>
                      <td>{item.project}</td>
                      <td>
                        <span>
                          <span onClick={() => editClient(item._id)} className='editDelteBtn'>Edit</span>&nbsp;|&nbsp;<span onClick={() => deleteClient(item._id)} className='editDelteBtn'>Delete</span>
                        </span>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </Col>
          <Col className='col-md-3'>
            <Row>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control value={firstName} onChange={e => setFirstName(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control value={lastName} onChange={e => setLastName(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control value={emailId} onChange={e => setEmailId(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Mobile No</Form.Label>
                <Form.Control value={mobileNo} onChange={e => setMobileNo(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Project</Form.Label>
                <Form.Control value={project} onChange={e => setProject(e.target.value)} />
              </Form.Group>
            </Row>
            <Row>&nbsp;</Row>
            <Row>
              <Col>
                {
                  showUpdateBtn ?
                    <Button onClick={() => updateClient()} variant='primary'>Update Client</Button>
                    : <Button onClick={() => createClient()} variant='primary'>Create Client</Button>
                }

              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div >
  );
}

export default App;
