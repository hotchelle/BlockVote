// SPDX-License-Identifier: MIT 
pragma solidity 0.8.4;


contract Poll{
    // maintain a mapping between all users to their votes
    mapping (address => string) userToVote;
    string [] votes; 

    // add a user's vote to the poll
    function addVote(address userAddress, string memory userVote) external {
        userToVote[userAddress] = userVote;
        votes.push(userVote);
    }

    // retrieve the vote of a particular user
    function getVote (address userAddress) external view returns(string memory) {
        return userToVote[userAddress];
    }

    // retrieve all votes for the poll 
    function getAllVotes() external view returns (string [] memory){
        return votes;
    }

}
