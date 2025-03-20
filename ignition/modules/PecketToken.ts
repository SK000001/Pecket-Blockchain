// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const INITIAL_SUPPLY: bigint = 1_000_000_000n * 10n ** 18n;

const PecketTokenModule = buildModule("PecketTokenModule", (m) => {
  const pecketToken = m.contract("PecketToken", [INITIAL_SUPPLY]);
  return { pecketToken };
});

export default PecketTokenModule;