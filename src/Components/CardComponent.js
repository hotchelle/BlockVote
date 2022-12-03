import React, { useState, useEffect } from 'react';
import { Card, Table, Form, Button, Row, Col } from "react-bootstrap"
import { useUserAuth } from '../context/UserAuthContext';
import { Contract, ethers } from "ethers";
import { getContractAddress, poll } from "ethers/lib/utils";
import abi from "../utils/ProjectManager.json"
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const CardComponent = () => {
  const [userAccount, setUserAccount] = useState("");
  const contractAddress = "0xda0A849294d73D0ab6e497bF43A8e9D523F32427";
  const contractABI = abi.abi;

  const [pollTitle, setpollTitle] = useState("")
  const [question, setQuestion] = useState("")
  const [option1, setOption1] = useState("")
  const [option2, setOption2] = useState("")
  const [option3, setOption3] = useState("")
  const [option4, setOption4] = useState("")
  const { user, logOut } = useUserAuth();

  const navigate = useNavigate();

  const isWalletConnected = async () => {
    try {
      // when the user is logged into their crypto wallet, they will have an object called ethereum available to use
      const { ethereum } = window;
      if (ethereum === undefined) {
        alert("A crypto wallet is required, download Metamask");
        return;
      }
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        const account = accounts[0];
        // console.log("Authorized account: ", account);
        setUserAccount(account);
      } else console.warn("No authorized account found");
    } catch (error) {
      alert(error)
    }
  }

  const createPoll = async (pollName) => {
    try {
      const { ethereum } = window;
      if (ethereum === undefined) {
        alert("Please download ethereum wallet: Metamask");
        return;
      }
      // Provider is what we use to talk to Ethereum nodes for deployment
      const provider = new ethers.providers.Web3Provider(ethereum);
      // get the signer of the contract returns an object
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      let new_poll = await contract.createPoll(pollTitle);
      console.log(`Poll ${pollTitle} was created successfully`);
      // let new_vote = await contract.insertVote("Test",signerAddress, "Working 13 ???");
      // let all_votes = await contract.retrieveVotes("Test")
      // console.log(`All votes: ${all_votes}`)
      // all_votes = await contract.retrieveVotes("Test")
      // console.log(`All votes: ${all_votes}`)
    } catch (error) {
      console.warn(error);
    }
  }


  const submitPoll = () => {

    // const pollTitle = req.body.pollTitle
    // const pollAdminAddr = req.body.pollAdminAddr
    // const questions = req.body.questions
    // const choices = req.body.choices

    const choices = option1 + "," + option2 + "," + option3 + "," + option4;
    console.log(user.email)
    axios.post("http://localhost:3001/createPoll", {
      pollTitle: pollTitle,
      question: question,
      choices: choices,
      pollAdminAddr: user && user.email
    })
      .then((response) => {
        console.log(response)
      });
  }
  useEffect(() => {
    isWalletConnected()
  }, [])

  const toPollCreation = () => {
    navigate('/PollCreation');
  }




  return (
    <div>
      <Card className={"border border-light bg-light text-black question-card"}>
        <Card.Header> Enter Question </Card.Header>
        <Form id="poll">
          <Card.Body>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Poll Title</Form.Label>
                <Form.Control type="text" placeholder="Enter poll title" name="title" value={pollTitle} onChange={(event) => { setpollTitle(event.target.value) }} />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Question Title</Form.Label>
                <Form.Control type="text" placeholder="Enter question" name="question" value={question} onChange={(event) => { setQuestion(event.target.value) }} />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Answer 1</Form.Label>
                <Form.Control type="text" placeholder="Answer 1" name="option1" value={option1} onChange={(event) => { setOption1(event.target.value) }} />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Answer 2</Form.Label>
                <Form.Control type="text" placeholder="Answer 2" name="option2" value={option2} onChange={(event) => { setOption2(event.target.value) }} />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Answer 3</Form.Label>
                <Form.Control type="text" placeholder="Answer 3" name="option3" value={option3} onChange={(event) => { setOption3(event.target.value) }} />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Answer 4</Form.Label>
                <Form.Control type="text" placeholder="Answer 4" name="option4" value={option4} onChange={(event) => { setOption4(event.target.value) }} />
              </Form.Group>
            </Row>
          </Card.Body>
          <Card.Footer>
            <div className='d-grid gap-2 md-5'>
              <Row >
                <Button variant="primary" type="Submit" size='md' onClick={(event) => {
                  event.preventDefault();
                  submitPoll()
                  createPoll()
                }}>
                  Submit
                </Button>


              </Row>
            </div>

            <div className='d-grid gap-2 md-5'>
              <Row >

                <Button variant="primary" style = {{marginTop:"10px"}} type="Submit" size='md' onClick={toPollCreation}>
                  Go Back
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
