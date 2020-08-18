const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
  path: path.join(__dirname, "./config.env"),
});

const net = require("net");
const express = require("express");
const request = require("request");

const Blockchain = require("./blockchain");
const PubSub = require("./pubsub");
const CHANNELS = require("./channels");

let PORT = process.env.PORT || 3000;

const ROOT_NODE_ADDRESS = `http://127.0.0.1:${PORT}`;

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

const syncChains = () => {
  request({ url: `${ROOT_NODE_ADDRESS}/api/blocks` }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      const rootChain = JSON.parse(body);

      blockchain.replaceChain(rootChain);
    }
  });
};

const isPortFree = (port) =>
  new Promise((resolve) => {
    const server = require("http")
      .createServer()
      .listen(port, () => {
        server.close();
        resolve(true);
      })
      .on("error", () => {
        resolve(false);
      });
  });

const findPort = async (port) => {
  if (await isPortFree(port)) return port;
  return await findPort(parseInt(port) + 1);
};

findPort(PORT)
  .then((port) => {
    PORT = port;

    app.listen(PORT, () => {
      console.log(`|> Ready on port ${PORT}.`);

      if (PORT !== process.env.PORT || 3000) syncChains();
    });
  })
  .catch((err) => console.log(err));
