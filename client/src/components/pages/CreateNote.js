import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_ENTRY } from "../../utils/mutations";
import { QUERY_ME } from '../../utils/queries';

const CreateNote = () => {
  const [addEntry, { error }] = useMutation(ADD_ENTRY);
  const { loading, data } = useQuery(QUERY_ME);
  
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

    window.location.reload();
  };


  return (
    <form
    style={{
      border: "2px solid blue",
      borderRadius: "10px",
      padding: "30px",
    }}
    onSubmit={handleFormSubmit}
    >
    <div className="mb-3">
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
    <div className="mb-3">
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
      ></textarea>
    </div>

    <button type="submit" className="btn btn-primary">
      Submit
    </button>
  </form>
  );
};

export default CreateNote;
