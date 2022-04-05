const { ethers } = require("ethers");
const {
  DefenderRelayProvider,
  DefenderRelaySigner,
} = require("defender-relay-client/lib/ethers");

const GovernorBravo = {
  address: "0xc0Da02939E1441F497fd74F78cE7Decb17B66529", // Compound governor address (replace if needed)
  ABI: [],
};

exports.handler = async function (event) {
  const provider = new DefenderRelayProvider(event);
  const signer = new DefenderRelaySigner(event, provider, { speed: "fastest" });

  // TODO: Complete logic
  // Query the proposal state given the proposal id
  //   If state is If the proposal is `Succeeded` queue it through a relayer
  //     Save in the Autotask store a state of `queue-tx-sent` so we don’t resend the tx
  //   If the proposal `Queued` then query the `eta`
  //   If `eta` has passed, send a tx to execute
  //     Save in the Autotask store a `execute-tx-sent` so we don’t resend the tx
  //   If `eta` hasn’t passed, skip
  //   If the proposal is `Executed` pause the Autotask
  //   If the proposal has any other state, skip
};
