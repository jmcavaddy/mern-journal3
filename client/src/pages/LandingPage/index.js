import React, { useState, useEffect } from 'react';	
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
// import LoginForm from '../../components/LoginForm';
// import SignupForm from '../../components/SignupForm'
import Auth from '../../utils/auth.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();	
  const handleAddNotesClick = () => {	
    navigate('/homepage');	
  };

  return (
    <>
      <header>
        <h1 className="landing-header">MERNJournal</h1>
        <h2 className="landing-subheader">your personal e-journal</h2>
      </header>
      <div className="landing-container">
        <div className="landing-content">
          <button className="nav-button" onClick={() => setShowModal(true)}>Login / Sign Up</button>
        </div>
      </div>
    </>
  );

  // return (
  //   <>
  //     <Navbar bg="dark" variant="dark" expand="lg">
  //       <Container fluid>
  //         <Navbar.Brand as={Link} to="/">
  //           MERNJournal
  //         </Navbar.Brand>
  //         <Navbar.Toggle aria-controls="navbar" />
  //         <Navbar.Collapse id="navbar" className="justify-content-end">
  //           <Nav>
  //             {Auth.loggedIn() ? (
  //               <>	
  //               <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>	
  //               <Nav.Link onClick={handleAddNotesClick}>Add Entry</Nav.Link>	
  //             </>
  //             ) : (
  //               <Nav.Link onClick={() => setShowModal(true)}>Login / Sign Up</Nav.Link>
  //             )}
  //           </Nav>
  //         </Navbar.Collapse>
  //       </Container>
  //     </Navbar>
  //     <Modal
  //       size="lg"
  //       show={showModal}
  //       onHide={() => setShowModal(false)}
  //       aria-labelledby="signup-modal"
  //       centered
  //     >
  //       <Tab.Container defaultActiveKey="signup">
  //         <Modal.Header closeButton>
  //           <Modal.Title id="signup-modal">
  //             <Nav variant="pills">
  //               <Nav.Item>
  //                 <Nav.Link as={Link} to="#" eventKey="login">
  //                   Login
  //                 </Nav.Link>
  //               </Nav.Item>
  //               <Nav.Item>
  //                 <Nav.Link as={Link} to="#" eventKey="signup">
  //                   Sign Up
  //                 </Nav.Link>
  //               </Nav.Item>
  //             </Nav>
  //           </Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>
  //           <Tab.Content>
  //             <Tab.Pane eventKey="login">
  //               <LoginForm handleModalClose={() => setShowModal(false)} />
  //             </Tab.Pane>
  //             <Tab.Pane eventKey="signup">
  //               <SignupForm handleModalClose={() => setShowModal(false)} />
  //             </Tab.Pane>
  //           </Tab.Content>
  //         </Modal.Body>
  //       </Tab.Container>
  //     </Modal>
  //   </>
  // );
};

export default LandingPage;