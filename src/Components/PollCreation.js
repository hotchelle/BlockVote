import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Button , Card , Row} from "react-bootstrap"
import { useUserAuth } from '../context/UserAuthContext';

const PollCreation  = () => {
  const navigate = useNavigate();
  const { user } = useUserAuth();


  const toResults = () => {
    navigate('/Results', {state: {email : user && user.email}});

  }

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title> Welcome to BlockVote</Card.Title>
        <Card.Text>
         Please either join a poll with your provided ID or create a Poll
        </Card.Text>
        <Row>
        <Button variant="primary" className='space'  onClick = {() => {navigate("/CardComponent")}}>Create Poll</Button>
        <Button variant="primary" className='space'  onClick = {() => {navigate("/Join")}}>Join Poll</Button>
        <Button variant="primary" className='space' onClick = {() => {toResults()}}>Results</Button>
        </Row>
      </Card.Body>
  </Card>
  );
}


export default PollCreation;

