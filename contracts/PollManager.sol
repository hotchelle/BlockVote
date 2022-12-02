// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;
import "./Poll.sol";
import "hardhat/console.sol";

contract PollManager {

    mapping (string => Poll) titleToPoll; 

    // creating new poll and adding it to the mapping 
    function createPoll(string memory pollName) public {
        Poll newPoll = new Poll();
        titleToPoll[pollName] = newPoll;
    }

    // add user's vote to a poll 
    function insertVote(string memory pollName, string memory vote) public {
        Poll poll = titleToPoll[pollName];
        poll.addVote(vote);
    }
    
    // // retreive all votes from a poll
    function retrieveVotes(string memory pollName) public view returns(string [] memory){
        console.log("Getting all votes from the poll:  ",pollName);
        return titleToPoll[pollName].getAllVotes();
    } 


}

