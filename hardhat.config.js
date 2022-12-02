require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks:{
    goerli: {
      // url: process.env.GOERLI_API_KEY,
      // accounts: process.env.PRIVATE_KEY
      url: "https://patient-attentive-darkness.ethereum-goerli.discover.quiknode.pro/f3bddb0a3c942bf53b463a06a8c59f4aeb359641/",
      accounts: ["0e7f7d5889c113abd85c5096148d27e2ea842482b14adc791f30aaf8f5c3402d"],
      
    }
  }
};
