import {Contract, ethers} from "ethers";
import { getContractAddress, poll } from "ethers/lib/utils";
import React , {useState, useEffect} from "react";
import abi from "../utils/ProjectManager.json"

import logo from "./Assets/Logo.png";


const Vote =  () => {
  const [userAccount, setUserAccount] = useState("");
  const [newPollName, setnewPollName] = useState("");
  const [votePoll, setvotePoll] = useState("");
  const [vote, setVote] = useState("");
  const [votes, setVotes] = useState([])
  const [rPollName, setRPollName] = useState("")
  const contractAddress = "0xAA5100fbc8f33cD2415522B71468B9E7Ff33Df41";
  const contractABI = abi.abi;
  const isWalletConnected = async() => {
  try{
    // when the user is logged into their crypto wallet, they will have an object called ethereum available to use
   const {ethereum} = window;
   if (ethereum === undefined) {
    alert("A crypto wallet is required, download Metamask");
    return;
    } 
  const accounts = await ethereum.request({method:"eth_accounts"});
  if (accounts.length !== 0){
    const account = accounts[0];
    // console.log("Authorized account: ", account);
    setUserAccount(account);
    }else console.warn("No authorized account found");
  }catch(error){
    alert(error)
  }
}

const connectToWallet = async () => {
  try{
    const {ethereum} = window;
    if (ethereum === undefined){
      alert("A crypto wallet is required, download Metamask");
      return;
    }
    // Requests that the user provides an Ethereum address to be identified by
    const account = await ethereum.request({method:"eth_requestAccounts"}).catch((error) => {
      if(error.code === 4001) alert("Please allow connection to Metamask")
      else console.warn(error)
    })
    setUserAccount(account[0])
  }catch(error){
    console.warn(error)
  }
}

const createPoll = async (pollName) => {
  try{
    const {ethereum} = window;
    if (ethereum === undefined){
      alert("Please download ethereum wallet: Metamask");
      return;
    }
    // Provider is what we use to talk to Ethereum nodes for deployment
    const provider = new ethers.providers.Web3Provider(ethereum);
    // get the signer of the contract returns an object
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    let new_poll = await contract.createPoll(pollName);
    console.log(`Poll ${pollName} was created successfully`);
    // let new_vote = await contract.insertVote("Test",signerAddress, "Working 13 ???");
    // let all_votes = await contract.retrieveVotes("Test")
    // console.log(`All votes: ${all_votes}`)
    // all_votes = await contract.retrieveVotes("Test")
    // console.log(`All votes: ${all_votes}`)
  }catch(error){
    console.warn(error);
  }
}

const addVote = async (pollName, vote) => {
  const {ethereum} = window;
  if (ethereum == undefined) {
    alert("Please download ethereum wallet: Metamask");
    return; 
  }
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = await provider.getSigner();
  const signerAddress = await signer.getAddress();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  await contract.insertVote(pollName, signerAddress, vote);
}

const getVotes = async (pollName) => {
  const {ethereum} = window;
  if (ethereum == undefined) {
    alert("Please download ethereum wallet: Metamask");
    return; 
  }
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = await provider.getSigner();
  const signerAddress = await signer.getAddress();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  let votes = await contract.retrieveVotes(pollName);
  setVotes(votes)
  console.log(votes)
  return votes
}

  useEffect(() => {
    isWalletConnected()
  }, [])
  return (
    <div className="demoDiv">
      <div><img src={logo} class="vote-ribbon"/></div>
      <div className="vote-header">
        <h2>Place a Vote</h2>
        <h4>Connect your wallet below and select a poll to place a vote in</h4>
        {!userAccount &&  <button className="buttonFunct" onClick={() => connectToWallet()}> Connect to Wallet </button>}
        <div className ="vote">
          <input className="inputFunct" placeholder="Poll Name" type = "text" value={votePoll} onChange={(event) => setvotePoll(event.target.value)}/>
        </div>
        <div className ="vote">
        <input className="inputFunct" placeholder="Vote (Yes/No)" type = "text" value={vote} onChange={(event) => setVote(event.target.value)}/>
        </div>
        <div className = "vote">
        <button className="buttonFunct" onClick={() => {
          addVote(votePoll, vote)
          setvotePoll("")
          setVote("")
        }}> Add vote to poll </button>
        </div>
      </div>
    </div>
  )
}

export default Vote;