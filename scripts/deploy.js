const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contract with account :", deployer.address);
  console.log("Account balance : ", accountBalance.toString());

  const Token = await ethers.getContractFactory("DonationApp");
  const portal = await Token.deploy({
    value: ethers.utils.parseEther("0.1"),
  });
  await portal.deployed();

  console.log("DonationApp address: ", portal.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
