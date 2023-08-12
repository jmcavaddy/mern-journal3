import React, { useState, useEffect } from 'react';	
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab, Button } from 'react-bootstrap';
import LoginForm from '../../components/LoginForm';
import SignupForm from '../../components/SignupForm'
import Auth from '../../utils/auth.js';

const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);

  // const navigate = useNavigate();	
  // const handleAddNotesClick = () => {	
  //   navigate('/homepage');	
  // };

  return (
    <>
        <Navbar bg="dark" data-bs-theme="dark">
            <Navbar.Brand href="#home" className='code'>MERNJournal</Navbar.Brand>
            <Navbar.Text className="m-auto code">
              your personal e-journal
            </Navbar.Text>
        </Navbar>
      
      <Button className='code' variant="dark" onClick={() => setShowModal(true)}>
        Login / Sign Up
      </Button>
       
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
        centered 
      >
        <Tab.Container defaultActiveKey="signup">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link as={Link} to="#" eventKey="login">
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="#" eventKey="signup">
                    Sign Up
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignupForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default LandingPage;
