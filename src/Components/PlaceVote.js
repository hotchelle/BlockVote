import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {Card, Form, Button, Row } from "react-bootstrap"
import {Radio, FormControl, RadioGroup, FormLabel, FormControlLabel} from "@mui/material"
import {ethers} from "ethers";
import { getContractAddress, poll } from "ethers/lib/utils";
import abi from "../utils/ProjectManager.json"
import axios from "axios";

import { useUserAuth } from '../context/UserAuthContext';





const PlaceVote = () => {
  const contractAddress = "0xda0A849294d73D0ab6e497bF43A8e9D523F32427";
  const contractABI = abi.abi;
  const navigate = useNavigate();
  const {state} = useLocation();
  const {pollId ,questions, choices, pollTitle} = state;
  const options = choices.split(",")
  const [vote, setVote] = useState("")
  const { user,logOut } = useUserAuth();

const addVote = async (pollTitle, vote) => {
  const {ethereum}  = window
  try{
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const pollManagerContract = new ethers.Contract(contractAddress, contractABI, signer)
      console.log(`title : ${pollTitle}, vote : ${vote}`)
      let voteCast = await pollManagerContract.insertVote(pollTitle, vote)
    }else{
      console.log("ethereum object is non-existent")
    }
  }catch(error){
    console.log(error)
  }

}
  

  const submitPoll = () => {
    // submit vote into the blockchain for the user 
    // subit vote into the database for the user 
    axios.post("http://localhost:3001/vote", {
      pollId : pollId, 
      email : user && user.email,
      vote : vote
    })
    .then((response) => {
      console.log(response)
    });
    // go back to the home page
  }

  const toPollCreation = () => {
    navigate('/PollCreation');
  }

  return (

    <Card className={"border border-light bg-light text-black question-card" }>
    <Card.Header> {questions} </Card.Header>
    <Form id = "poll">
    <Card.Body>
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Choose one of the following options for the {questions} poll: </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          value={vote}
          onChange = {(e) => setVote(e.target.value)}
        >
          <FormControlLabel value={options[0]} control={<Radio />} label={options[0]} />
          <FormControlLabel value={options[1]}  control={<Radio />} label= {options[1]} />
          <FormControlLabel value={options[2]}  control={<Radio />} label= {options[2]}  />
          <FormControlLabel value={options[3]}  control={<Radio />} label= {options[3]}  />
        </RadioGroup>
    </FormControl>
    </Card.Body>
    <Card.Footer>
      <div className='d-grid gap-2 md-5'>
       <Row >
        <Button variant="primary" type="Submit" size='md' onClick={ (event) => {
          event.preventDefault();
          addVote(pollTitle, vote)
          submitPoll()
          
        }}>
            Submit 
        </Button>

       
      </Row> 
      </div>

      <div className='space'>
       <Row >
       <Button variant="primary" type="Submit" style= {{marginTop: "10px"}} className='d-grid gap-2 md-5' onClick={ toPollCreation }>
            Leave Poll
        </Button>

       
      </Row> 
      </div>
    </Card.Footer>
    </Form>
    <div className='d-grid gap-2'>
    </div>
  </Card>


  )
}



export default PlaceVote;

