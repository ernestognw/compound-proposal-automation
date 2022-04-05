require("dotenv").config();
const { AutotaskClient } = require("defender-autotask-client");
const { join } = require("path");
const { argv } = require("process");

const [_, __, proposalId] = argv;

const main = async () => {
  if (!proposalId)
    throw new Error("proposalId needed. Autotask creation aborted");

  const client = new AutotaskClient({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
  });

  try {
    const { autotaskId } = await client.create({
      name: `Proposal ${proposalId} automatoooor`,
      encodedZippedCode: await client.getEncodedZippedCodeFromFolder(
        join(__dirname, "../code")
      ),
      relayerId: process.env.RELAYER_ID,
      trigger: {
        type: "schedule",
        frequencyMinutes: 5,
      },
      paused: false,
    });

    console.log(`Autotask with id ${autotaskId} created correctly.`);
  } catch (err) {
    console.log(err);
  }
};

main()
  .then(() => process.exit(0))
  .catch(() => {
    console.log(`Failed to create autotask for proposal ${proposalId}`);
    process.exit(1);
  });
