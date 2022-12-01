import React , {useState} from 'react';
import {Card, Table, Form, Button, Row, Col } from "react-bootstrap"
import { useUserAuth } from '../context/UserAuthContext';
import axios from "axios";
const CardComponent = () => {
  const [pollTitle, setpollTitle] = useState("")
  const [question, setQuestion] = useState("")
  const [option1, setOption1] = useState("")
  const [option2, setOption2] = useState("")
  const [option3, setOption3] = useState("")
  const [option4, setOption4] = useState("")
  const { user,logOut } = useUserAuth();

  const submitPoll = () => {

    // const pollTitle = req.body.pollTitle
    // const pollAdminAddr = req.body.pollAdminAddr
    // const questions = req.body.questions
    // const choices = req.body.choices

    const choices = option1 + "," + option2 + "," +  option3 + "," + option4;

    axios.post("http://localhost:3001/createPoll", {
        pollTitle : pollTitle,
        question : question, 
        choices : choices,
        pollAdminAddr : "random.gmail.com"
      })
      .then((response) => {
        console.log(response)
      });
  }


    return (
      <div> 
        <Card className={"border border-light bg-light text-black question-card" }>
      <Card.Header> Enter Question </Card.Header>
      <Form id = "poll">
      <Card.Body>
          <Row>
            <Form.Group  as = {Col}>
              <Form.Label>Poll Title</Form.Label>
              <Form.Control type="text" placeholder="Enter poll title" name = "title" value={pollTitle} onChange={(event) => {setpollTitle(event.target.value)}}/>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group  as = {Col}>
              <Form.Label>Question Title</Form.Label>
              <Form.Control type="text" placeholder="Enter question" name = "question" value={question} onChange={(event) => {setQuestion(event.target.value)}}/>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group  as = {Col}>
              <Form.Label>Answer 1</Form.Label>
              <Form.Control type="text" placeholder="Answer 1" name = "option1" value={option1} onChange={(event) => {setOption1(event.target.value)}} />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group  as = {Col}>
              <Form.Label>Answer 2</Form.Label>
              <Form.Control type="text" placeholder="Answer 2" name = "option2" value={option2} onChange={(event) => {setOption2(event.target.value)}}/>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group  as = {Col}>
              <Form.Label>Answer 3</Form.Label>
              <Form.Control type="text" placeholder="Answer 3" name = "option3" value={option3} onChange={(event) => {setOption3(event.target.value)}}/>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group  as = {Col}>
              <Form.Label>Answer 4</Form.Label>
              <Form.Control type="text" placeholder="Answer 4" name = "option4" value={option4} onChange={(event) => {setOption4(event.target.value)}}/>
            </Form.Group>
          </Row>
      </Card.Body>
      <Card.Footer>
        <div className='d-grid gap-2 md-5'>
         <Row >
          <Button variant="primary" type="Submit" size='md' onClick={ (event) => {
            event.preventDefault();
            submitPoll()
          }}>
              Submit 
          </Button>
        </Row> 
        </div>
      </Card.Footer>
      </Form>
      <div className='d-grid gap-2'>
      </div>
    </Card>
      </div>
    );
};

export default CardComponent;