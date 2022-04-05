## Compound Governance Proposal Automation ✨

Creates an Autotask given a `proposalId` that runs every 5 minutes and acts upon the current state

![](https://compound.finance/images/gov_diagram.png)

It follows the logic specified below:

- Query the proposal state given the proposal id
  - If the proposal is `Succeeded`, queue it through a relayer transaction
    - Save in the Autotask key-value store a state of `queue-tx-sent` so the Autotask don’t resend the tx
  - If the proposal `Queued` then query the eta
    - If `eta` has passed, send a tx to execute
      - Save in the Autotask key-value store a `execute-tx-sent` so the relayer don't resend the tx
    - If `eta` hasn’t passed, skip
  - If the proposal is `Executed` pause the Autotask
  - If the proposal has any other state, skip

## How to deploy the Autotask ⚙️

1. Go to `code/index.js` and replace `GovernorBravo.address` if needed
3. Create an account and sign in to [Open Zeppelin Defender](https://defender.openzeppelin.com/)
4. Create a Relayer at the `Relay` tab for the same network where the `GovernorBravo` is deployed and fund it with any amount you'd like to provide for the proposals automations
5. Create a copy of `.env.example` in a `.env` file and fill with your Defender Team API Keys and your relayer id
6. Execute `yarn create:autotask <proposalId>`

### Note
There are no `proposalId` validation, so be careful of providing an invalid `proposalId`
