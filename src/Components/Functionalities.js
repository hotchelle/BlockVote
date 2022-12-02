import {Contract, ethers} from "ethers";
import { getContractAddress, poll } from "ethers/lib/utils";
import React , {useState, useEffect} from "react";
import abi from "../utils/ProjectManager.json"

const Functionalities =  () => {
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


  // console.log("signer: ", signer)
  // console.log("signerAddress: ", signerAddress)
  // console.log("contract: ", contract)



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
        <h1>Functionalities Demo</h1>
        <h5>Create poll</h5>
        {!userAccount &&  <button className="buttonFunct" onClick={() => connectToWallet()}> Connect to Wallet </button>}
        <label>Poll Name</label>
        <input className="inputFunct" type = "text" value = {newPollName} onChange={(event) => setnewPollName(event.target.value)}/>
        <button className="buttonFunct" onClick={() => {
          createPoll(newPollName)
          setnewPollName("Enter new poll name")
        }}> Create Poll </button>
        <h5>Add vote to poll</h5>
        <label>Poll Name</label>
        <input className="inputFunct" type = "text" value={votePoll} onChange={(event) => setvotePoll(event.target.value)}/>
        <label>Vote</label>
        <input className="inputFunct" type = "text" value={vote} onChange={(event) => setVote(event.target.value)}/>
        <button className="buttonFunct" onClick={() => {
          addVote(votePoll, vote)
          setvotePoll("")
          setVote("")
        }}> Add vote to poll </button>
        <h5>See all votes from a poll</h5>
        <label>Poll Name</label>
        <input className="inputFunct" type = "text" value={rPollName} onChange={(event) => setRPollName(event.target.value)}/>
        <button className="buttonFunct" onClick={() => {
          getVotes(rPollName)
          setRPollName("");
        }}> See all votes from poll </button>
        {
          votes.map((v) => {return <li key={v}>{v}</li>})
        }
    </div>
  )
}

export default Functionalities;