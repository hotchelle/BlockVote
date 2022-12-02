// SPDX-License-Identifier: MIT 
pragma solidity 0.8.4;


contract Poll{
    // maintain a mapping between all users to their votes
    string [] votes; 
    // add a user's vote to the poll
    function addVote(string memory userVote) external {
        votes.push(userVote);
    }
    // retrieve all votes for the poll 
    function getAllVotes() external view returns (string [] memory){
        return votes;
    }

}
