import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("PecketToken", function () {
  async function deployPecketTokenFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const PecketToken = await hre.ethers.getContractFactory("PecketToken");
    const pecketToken = await PecketToken.deploy(ethers.parseEther("1000000000"));

    return { pecketToken, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should assign the total supply of tokens to the owner", async function () {
      const { pecketToken, owner } = await loadFixture(deployPecketTokenFixture);
      expect(await pecketToken.balanceOf(owner.address)).to.equal(ethers.parseEther("1000000000"));
    });
  });

  describe("Transfers", function () {
    it("Should transfer tokens between accounts", async function () {
      const { pecketToken, owner, otherAccount } = await loadFixture(deployPecketTokenFixture);
      await pecketToken.transfer(otherAccount.address, ethers.parseEther("100"));
      expect(await pecketToken.balanceOf(otherAccount.address)).to.equal(ethers.parseEther("100"));
    });

    it("Should fail if sender doesn’t have enough tokens", async function () {
      const { pecketToken, otherAccount } = await loadFixture(deployPecketTokenFixture);
      await expect(pecketToken.connect(otherAccount).transfer("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", ethers.parseEther("100"))).to.be.revertedWith("Insufficient balance");
    });
  });

  describe("Minting", function () {
    it("Should allow only the owner to mint tokens", async function () {
      const { pecketToken, owner, otherAccount } = await loadFixture(deployPecketTokenFixture);
      await pecketToken.mint(owner.address, ethers.parseEther("10000"));
      expect(await pecketToken.balanceOf(owner.address)).to.equal(ethers.parseEther("100001000"));
    });

    it("Should fail if a non-owner tries to mint tokens", async function () {
      const { pecketToken, otherAccount } = await loadFixture(deployPecketTokenFixture);
      await expect(pecketToken.connect(otherAccount).mint(otherAccount.address, ethers.parseEther("10000"))).to.be.reverted;
    });
  });
});