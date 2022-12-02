import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Button , Card , Row, Form, Col} from "react-bootstrap"
import axios from "axios";

const JoinPoll  = () => {
  const navigate = useNavigate();
  const [pollId, setPollId] = useState("")

  const getPoll = () => {

    axios.get("http://localhost:3001/getQuestion", {
       params: { pollID : pollId}
      })
      .then((response) => {
        console.log(response.data[0])
        navigate("/PlaceVote", {state : {pollId: pollId, questions : response.data[0].questions, choices : response.data[0].choices, pollTitle : response.data[0].pollTitle}})
        
      });
  }


  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title> Please Enter the Poll ID</Card.Title>
        <Card.Text>
         The poll ID is a 16 digit number provided to you by the poll adminstrator 
        </Card.Text>
        <Form.Group  as = {Col}>
              <Form.Control type="text" placeholder="Poll ID" name = "question"  className='center-text' value={pollId}  onChange  = {(event) => setPollId(event.target.value)}/>
        </Form.Group>
        <Row>
          <Button className = "space2" variant="primary" onClick={() => {
            getPoll(pollId)
        }}> Join Poll</Button>
        </Row>
      </Card.Body>
    </Card>
  );
}


export default JoinPoll;

