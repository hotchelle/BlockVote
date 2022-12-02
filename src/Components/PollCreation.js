import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Button , Card , Row} from "react-bootstrap"
const PollCreation  = () => {
  const navigate = useNavigate();
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title> Welcome to BlockVote</Card.Title>
        <Card.Text>
         Please either join a poll with your provided ID or create a Poll
        </Card.Text>
        <Row>
        <Button variant="primary" className='space'  onClick = {() => {navigate("/CardComponent")}}>Create Poll</Button>
        <Button variant="primary" onClick = {() => {navigate("/Join")}}>Join Poll</Button>
        </Row>
      </Card.Body>
  </Card>
  );
}


export default PollCreation;

