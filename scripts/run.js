const { ethers } = require("hardhat");

async function main() {
  const donationAppFactory = await ethers.getContractFactory("DonationApp");
  console.log("Deploying Contract ...");

  const initialBalance = ethers.utils.parseEther("0.1");
  const donationApp = await donationAppFactory.deploy({
    value: initialBalance,
  });

  await donationApp.deployed();
  console.log(`Contract deployed to : ${donationApp.address}`);

  let contractBalance = await ethers.provider.getBalance(donationApp.address);
  console.log("Contract balance:", ethers.utils.formatEther(contractBalance));

  // trying to donate

  const donateTxn = await donationApp.doDonation(
    "Okabe",
    "MAD SCIENTIST",
    ethers.utils.parseEther("0.001")
  );
  await donateTxn.wait(1);

  //checking contract balance again

  contractBalance = await ethers.provider.getBalance(donationApp.address);
  console.log(
    "Updated contract balance is :",
    ethers.utils.formatEther(contractBalance)
  );

  // getting donation

  let allDonations = await donationApp.getAllDonations();
  console.log(allDonations);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
