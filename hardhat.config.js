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
      url: "https://polygon-mumbai.g.alchemy.com/v2/hCEgg_yXjxOc6YpJFmz7K9l48aqP1oJf", // Mumbai Testnet RPC URL
      accounts: ['3b1633584800e000c60556bae8e6768688bc8190d0e6c16351bd30ebfe87267b']
    }
  }
};
