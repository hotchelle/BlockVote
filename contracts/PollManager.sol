// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;
import "./Poll.sol";
import "hardhat/console.sol";

contract PollManager {

    // mapping between poll titles and actual polls 
    mapping (string => Poll) titleToPoll; 

    // creating new poll and adding it to the mapping 
    function createPoll(string memory pollName) public {
        console.log("Creating a poll titled: ", pollName);
        Poll newPoll = new Poll();
        titleToPoll[pollName] = newPoll;
    }

    // add user's vote to a poll 
function insertVote(string memory pollName, address voterAddress, string memory vote) public {
        console.log("Inserting vote into ",pollName, "for the user with the address", voterAddress);
        Poll poll = titleToPoll[pollName];
        poll.addVote(voterAddress, vote);
    }

    // retreive a user's vote in a specific poll
    function retrieveVote(string memory pollName, address voterAddress) public view returns(string  memory){
        console.log("Getting vote from the poll ",pollName, "for the user with the address", voterAddress);
        return titleToPoll[pollName].getVote(voterAddress);
    } 
    
    // retreive all votes from a poll
    function retrieveVotes(string memory pollName) public view returns(string [] memory){
        console.log("Getting all votes from the poll:  ",pollName);
        return titleToPoll[pollName].getAllVotes();
    } 


}

