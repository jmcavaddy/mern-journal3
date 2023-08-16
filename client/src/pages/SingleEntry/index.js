// File that will render a single note and edit/delete functionality
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";

import { QUERY_SINGLE_ENTRY} from '../../utils/queries';
import { EDIT_ENTRY } from "../../utils/mutations";

// TODO: style this page; make sure there is a button to logout in header

const SingleEntry = () => {
    const { entryId } = useParams();
    const [formState, setFormState] = useState({ entryTitle: '', entryContent: ''});
    const [editEntry] = useMutation(EDIT_ENTRY);
    const navigate = useNavigate();

    const { loading, data } = useQuery(QUERY_SINGLE_ENTRY, {
        variables: { entryId: entryId },
    });

    useEffect(() => {
        if (data) {
            setFormState({
                entryTitle: data.entry.entryTitle,
                entryContent: data.entry.entryContent,
            });
        }
    }, [data]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
      };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await editEntry({
                variables: {
                    entryId: entryId,
                    entryTitle: formState.entryTitle,
                    entryContent: formState.entryContent,
                },
            });
      
        }
        catch (err) {
            console.error(err);
        }

        navigate(`/homepage`);

    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container my-1">
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
                    onChange={handleInputChange}
                    name='entryTitle'
                    value={formState.entryTitle}
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
                    onChange={handleInputChange}
                    name='entryContent'
                    value={formState.entryContent}
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
                </form>
                </div>
    );
};

export default SingleEntry;

