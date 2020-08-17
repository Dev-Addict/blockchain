const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
  path: path.join(__dirname, "./config.env"),
});

const express = require("express");

const Blockchain = require("./blockchain");
const PubSub = require("./pubsub");
const CHANNELS = require("./channels");

const app = express();

const blockchain = new Blockchain();

const messageHandler = (channel, message) => {
  const parsedMessage = JSON.parse(message);

  if (channel === CHANNELS.BLOCKCHAIN) {
    blockchain.replaceChain(parsedMessage);
  }
};

const pubsub = new PubSub({
  channel: CHANNELS.BLOCKCHAIN,
  blockchain,
  messageHandler,
});

app.use(express.json());

app.get("/api/v1/blocks", (req, res) => {
  res.json({
    status: "success",
    data: {
      blocks: blockchain.chain,
    },
  });
});

app.post("/api/v1/blocks", (req, res) => {
  const { data } = req.body;

  const block = blockchain.addBlock({ data });

  pubsub.broadcastChain();

  res.json({
    status: "success",
    data: {
      block,
    },
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`|> Ready on port ${PORT}.`);
});
