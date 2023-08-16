
import React, { useEffect, useState } from "react";
import { Card, Button, Navbar, Container, Row, Col } from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/client";
import "../../App";
import { QUERY_ME } from '../../utils/queries';
import { REMOVE_ENTRY, ADD_ENTRY } from "../../utils/mutations";
import Auth from '../../utils/auth';

  const Notes = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [addEntry] = useMutation(ADD_ENTRY);
  const [removeEntry] = useMutation(REMOVE_ENTRY);

  const [formState, setFormState] = useState({ entryTitle: '', entryContent: '' });
  const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    if (data) {
      setUserData(data.me);
    }
  }, [data]);


  const handleDelete = async (entryId) => {
    console.log(userData)

    try {
      await removeEntry({
          variables: { entryId: entryId },
      });

      setUserData((userData) => ({
        ...userData,
        entries: userData.entries.filter((entry) => {
        return entry._id !== entryId;
        }),
      }));

    } catch (err) {
      console.error(err);
    }

  };

  // TODO: add button here to navigate to landing page
  if (!userData || !userData.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  if (!userDataLength) {
    return <div>Loading...</div>;
  }

  // TODO: style saved entries so they are centered and have space around them; 1 column on mobile, 2 on tablet, 3 on desktop

  return (
    <>
      <Button className="m-2 code" variant="primary" href="/newentry">New Entry</Button>

      <h1 className="my-4 text-center code">saved entries</h1>

      <Container className="code">
        <Row>
          <Col>
            {userData.entries.map((entry) => {
              return (
                  <Card key={entry._id} className="card mx-2" style={{ width: "18rem", backgroundColor: "lavender", padding: "5px", margin: "5px" }}>
                  <Card.Body>
                    <Card.Title>{entry.entryTitle}</Card.Title>
                    <Card.Subtitle className="mb-1 text-muted">
                    {entry.createdAt}
                    </Card.Subtitle>
                    <Card.Text>
                      {entry.entryContent}
                    </Card.Text>
                    <Card.Link href={`/entry/${entry._id}`}>Edit</Card.Link>
                    <Card.Link href="#" onClick={() => handleDelete(entry._id)}>Delete</Card.Link>
                  </Card.Body>
                </Card>
              );
            })}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Notes;
