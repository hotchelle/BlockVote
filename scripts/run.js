// mainly use for debugging
const main = async () => {
  const [voter , randomWallet] = await hre.ethers.getSigners();
  // Will compile the PollManager contract and generate files in the artifact directory
  // tl;dr basically an instantiation of the PollManager contract 
  const pollContractFactory = await hre.ethers.getContractFactory("PollManager");
  // hardhat creates a local ethereum network for the contract and then destroys the network after the script is done
  const pollManagerContract = await pollContractFactory.deploy();
  // making sure that the contract is deploys waiting for it to be on the local blockchain
  await pollManagerContract.deployed();
  console.log("Contract deployed to:", pollManagerContract.address);
  
  let new_poll = await pollManagerContract.createPoll("team building");
  let all_votes;
  all_votes = await pollManagerContract.retrieveVotes("team building");
  let new_vote;
  new_vote = await pollManagerContract.insertVote("team building",voter.address, "John, Jake, Paul");
  await new_vote.wait();
  all_votes = await pollManagerContract.retrieveVotes("team building");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
};

runMain();

// to run the script: npx hardhat run scripts/run.js