const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  if (!deployer) {
    console.error("Failed to obtain deployer signer.");
    return;
  }

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  // Ensure deployer object is valid before attempting to get balance
  if (!deployer.provider) {
    console.error("Deployer provider is not available.");
    return;
  }

  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance));

  try {
    // Replace "ImageUpload" with your contract name
    const Contract = await ethers.getContractFactory("ImageUpload");
    const contract = await Contract.deploy();

    console.log("Contract deployed to address:", contract.address); // Log deployed contract's address
  } catch (error) {
    console.error("Error deploying contract:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
