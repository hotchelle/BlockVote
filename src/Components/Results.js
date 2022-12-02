import { CSVLink, CSVDownload } from "react-csv";
import { Button } from "react-bootstrap";
import react,{ useState,useEffect } from "react";
import axios from "axios";
import { useUserAuth } from '../context/UserAuthContext';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useNavigate } from "react-router-dom";
import {useLocation} from 'react-router-dom';


const Results = ({ pollID, pollTitle}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [poll, setPoll] = useState([]);

    useEffect(() => {
        console.log("getPoll clicked, poll_id:")
        axios.get("http://localhost:3001/title", {
            params: { emailAddress: location.state.email }
        }).then((response) => {
            setPoll(response.data);
            console.log(response.data);
        })

    }, []);

  return (
    <ListGroup >
      {poll.map( poll => <ListGroup.Item action onClick = {() =>
      {
        navigate("/Charter",{state: {pollTitle : poll.pollTitle}});
      }}> {poll.pollTitle} </ListGroup.Item>
    )}

    </ListGroup>
  );
}

export default Results;
/*
const ReactCsv = ({ pollTitle, pollID }) => {

    const { user } = useUserAuth();
    const [id, setId] = useState();
    const [votes, setVotes] = useState();


    useEffect(() => {
        axios.get("http://localhost:3001/answers", {
            params: { pollID : pollID }
        }).then((response) => {
            setVotes(response.data);
            console.log(response.data);
        }
        )

    }, []);


    const createCsvFileName = ()=> `votes.csv`;
    const headers = [
        { label: 'No. Votes', key: 'number' },
        { label: 'VOTE', key: 'VOTE' },
    ];

    

    let data = []
    votes.forEach(item => {
        data.push({
            name: item.name,
            description: item.description,
        });
        for (let i = 1; i < item.suggestedRoles.length; i++) {
            const role = item.suggestedRoles[i];
            data.push({
                name: '',
                description: '',
                suggestedRoles: role.name
            });
        }
    });

    

    return (
        <div>
            <h1>{pollTitle}    {pollID}</h1>
        </div>
    );
};

export default ReactCsv;
*/

