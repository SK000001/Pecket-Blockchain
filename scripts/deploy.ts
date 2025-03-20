import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with account: ${deployer.address}`);

  // Deploy Pecket Token
  const PecketToken = await ethers.getContractFactory("PecketToken");
  const token = await PecketToken.deploy(1000000000);
  await token.waitForDeployment(); // Ethers v6 uses waitForDeployment()
  console.log(`✅ Pecket Token deployed at: ${await token.getAddress()}`);

  // Deploy Pecket Staking
  const PecketStaking = await ethers.getContractFactory("PecketStaking");
  const staking = await PecketStaking.deploy(await token.getAddress());
  await staking.waitForDeployment();
  console.log(`✅ Pecket Staking deployed at: ${await staking.getAddress()}`);

  // Deploy Pecket Finality
  const PecketFinality = await ethers.getContractFactory("PecketFinality");
  const finality = await PecketFinality.deploy();
  await finality.waitForDeployment();
  console.log(`✅ Pecket Finality System deployed at: ${await finality.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
