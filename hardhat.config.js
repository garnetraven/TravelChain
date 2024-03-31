require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    localhost: {
      url: "http://localhost:8545", // Assuming your local RPC node is running on this port
      chainId: 31337 // Chain ID of your local RPC node
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/<API>", // Mumbai Testnet RPC URL
      accounts: ['<privaetkey>']
    }
  }
};
