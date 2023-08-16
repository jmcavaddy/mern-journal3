import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_ENTRY } from "../../utils/mutations";
import { QUERY_ME } from '../../utils/queries';
import { useNavigate } from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';
import Auth from '../../utils/auth.js';


const CreateNote = () => {
  const [addEntry, { error }] = useMutation(ADD_ENTRY);
  const { loading, data } = useQuery(QUERY_ME);
  const navigate = useNavigate();

  
  const [formState, setFormState] = useState({ entryTitle: '', entryContent: '' });
  const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
      if (data) {
        setUserData(data.me);
      }
  }, [data]);

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

      console.log(data);

      console.log(userData);

      setUserData((userData) => ({
        ...userData,
        entries: [...userData.entries, data.addEntry],
      }));

      console.log(userData);

      setFormState({
        entryTitle: '',
        entryContent: '',
      });

    } catch (e) {
      console.error(e);
    }

    navigate(`/homepage`);
  };

  // TODO: disable button OR add an error message if there isn't a title/content 

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="code">
        <Navbar.Text className='m-2'>MERNJournal</Navbar.Text>
        <Button className='ms-auto m-2' variant='danger' onClick={Auth.logout}>Logout</Button>
      </Navbar>


      <h4 className="text-center code m-2">Create a New Entry</h4>
      
        <form onSubmit={handleFormSubmit} className="container code flex-column justify-content-center align-items-center" >
          <div className="code">
            <label htmlFor="Title" className="form-label">
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
            />
          </div>
          <div className="mb-3 code">
            <label htmlFor="Note" className="form-label">
              Entry
            </label>
            <textarea
              type="text"
              className="form-control"
              id="Note"
              placeholder="Entry Content"
              onChange={handleInputChange}
              name='entryContent'
              rows={10}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </form>
    </>
  );
};

export default CreateNote;
