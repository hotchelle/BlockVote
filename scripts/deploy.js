const main = async () => {
  // essentially generates an ethereum account to sign transactions
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();
  console.log(`Deploying contracts with account: ${deployer.address}`);

  const pollManagerFactory = await hre.ethers.getContractFactory("PollManager");
  const pollManagerContract = await pollManagerFactory.deploy();
  await pollManagerContract.deployed();
  console.log(`Deployed contract address ${pollManagerContract.address}`)

}




const runMain = async () => {
  try{
    await main();
    process.exit(0);
  }catch(error){
    console.log(error);
    process.exit(1);
  }
};

runMain();






// to run: npx hardhat run scripts/deploy.js --network localhost