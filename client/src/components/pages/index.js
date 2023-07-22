
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/client";
import "../../App";
import { QUERY_ME } from '../../utils/queries';
import { REMOVE_ENTRY, ADD_ENTRY } from "../../utils/mutations";
import Auth from '../../utils/auth';
import background from "../../images/robo1.jpg";

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

  if (!userData || !userData.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {

      const { data } = await addEntry({
        variables: { ...formState },	
      });

      setUserData((userData) => ({
        ...userData,
        entries: [...userData.entries, data.addEntry],
      }));

      setFormState({
        entryTitle: '',
        entryContent: '',
      });

    } catch (e) {
      console.error(e);
    }
  };

  if (!userDataLength) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ background: `linear-gradient(
      to left, rgba(255,0,0,0), rgba(13,62,51,0.35)),url(${background})`, height: "100vh", width: "100%",}}>
    <div className="container">
      <div className="row justify-content">
        <div className="col-md-10">
          <div>
            <button style={{ float: "right" }} onClick={Auth.logout}>Logout</button>
          </div>
          <div>
            <h1 className="my-4 text-center"style={{ color: "white" }}>My Entries</h1>
            <form
              style={{
                border: "2px solid blue",
                borderRadius: "10px",
                padding: "30px",
                fontWeight: "bold",
                
              }}
              onSubmit={handleFormSubmit}
              >
              <div className="mb-3">
                <label htmlFor="Title" className="form-label" style={{ color: "white" }}>
                  Entry Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  aria-describedby="titleHelp"
                  placeholder="Entry Title"
                  onChange={handleInputChange}
                  name='entryTitle'
                  value={formState.entryTitle}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Note" className="form-label" style={{ color: "white" }}>
                  Entry
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="Note"
                  placeholder="Entry Content"
                  onChange={handleInputChange}
                  name='entryContent'
                  value={formState.entryContent}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            <div>
              <div className="my-4 mynotes row">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Notes;
