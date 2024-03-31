const { expect } = require("chai"); 
const { ethers } = require("hardhat"); 

describe("PhotoStorage", function () {
  let PhotoStorage, photoStorage, owner;

  // Before each test case, deploy the PhotoStorage contract and get the owner account
  beforeEach(async () => {
    PhotoStorage = await ethers.getContractFactory("PhotoStorage");
    [owner, ...addrs] = await ethers.getSigners();
    photoStorage = await PhotoStorage.deploy();
  });

  // Test case to verify image upload functionality with GPS data
  it("Should upload an image with GPS data", async function () {
    // Example image data and GPS coordinates
    const imageData = "QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ";
    const latitude = "50.819053333333336";
    const longitude = "50.819053333333336";

    // Upload the image with GPS data
    await photoStorage.connect(owner).uploadImage(imageData, latitude, longitude);

    // Get the uploaded image
    const image = await photoStorage.getImage(0);

    // Check if the uploaded image data matches the expected data
    expect(image[0]).to.equal(imageData); // Check image hash
    expect(image[1]).to.equal(latitude); // Check latitude
    expect(image[2]).to.equal(longitude); // Check longitude
  });
});
