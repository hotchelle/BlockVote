/*import React from 'react';
import ReactCsv from './Results';
import { useEffect, useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useUserAuth } from '../context/UserAuthContext';
import axios from 'axios';

const ResultsAdapter = () => {
    const [title, setTitle] = useState();

    const { user, logOut } = useUserAuth();


    console.log("getPoll clicked, poll_id:")
    console.log(user && user.email)


    useEffect(() => {
        console.log(user && user.email)
        console.log("getPoll clicked, poll_id:")
        axios.get("http://localhost:3001/title", {
            params: { emailAddress: user && user.email }
        }).then((response) => {
            setTitle(response.data);
            console.log(response);
        })

    }, []);

    useEffect(() => {
        console.log(user && user.email)
        console.log("getPoll clicked, poll_id:")
        axios.get("http://localhost:3001/title", {
            params: { emailAddress: user && user.email }
        }).then((response) => {
            setTitle(response.data);
            console.log(response.data);
        })

    }, []);

    const getTitle = () => {
        console.log(user && user.email)
        console.log("getPoll clicked, poll_id:")
        axios.get("http://localhost:3001/title", {
            params: { emailAddress: user && user.email }
        }).then((response) => {
            setTitle(response.data);
            console.log(response.data);
        })
    }
    return (
        <div>
            <Button onClick={() => getTitle()}>Get Title</Button>
            title.ForEach(item => {
            })
        </div>
    )
}
export default ResultsAdapter;




/*
        <CSVLink
            data={data}
            headers={headers}
            filename={createCsvFileName()}
            target="_blank"
            style={{ textDecoration: 'none', outline: 'none', height: '5vh' }}
        >
            <Button variant="contained" color="secondary" style={{ height: '100%' }}>
                Download CSV
            </Button>
        </CSVLink>
*/
