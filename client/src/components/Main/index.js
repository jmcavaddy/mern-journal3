// File that the user will be directed to after logging in/signing up.
// This page will show all of the user's notes and allow them to create new notes.
import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { useQuery } from '@apollo/client';

import Auth from '../../utils/auth';
import { QUERY_ME } from '../../utils/queries';

const Main = () => {
  const { loading, data } = useQuery(QUERY_ME);

  const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
      if (data) {
        setUserData(data.me);
      }
  }, [data]);

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  if (!userData?.username) {
    return (
      <>
        <Navbar bg="dark" data-bs-theme="dark" className='p-3'>
          <Navbar.Brand href="#home" className='code'>MERNJournal</Navbar.Brand>
          <Navbar.Text className="ms-auto code">
            an e-journal
          </Navbar.Text>
        </Navbar>
        <h4 className="text-center">
          There is not a user logged in:
          {/* TODO: add a button here that directs user to landing page */}
          <Button className="m-2 code" variant="dark" href="/">return to landing page</Button>
        </h4>
      </>
    );
  }
 
  return (
      <div fluid className='text-light bg-dark p-5'>
        <Container>
          <h1>Viewing saved entries!</h1>
        </Container>
        <Container>
          <h2 className='pt-5'>
            {userDataLength
              ? `Viewing ${(userDataLength + 1)} saved ${(userDataLength + 1) === 1 ? 'entry' : 'entries'}:`
              : 'You have no saved books!'}
          </h2>
        </Container>
        <Container>
          <Row>
            {userData.entries.map((entry => {
              return (
                  <Col md="4">
                    <Card key={entry._id} border='dark'>
                      <Card.Body>
                        <Card.Title>{entry.entryTitle}</Card.Title>
                        <Card.Text>{entry.entryContent}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
              );
            }))}
          </Row>
        </Container> 
        </div>

  );
};

export default Main;