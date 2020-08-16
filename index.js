const express = require("express");

const Blockchain = require("./blockchain");

const app = express();

const blockchain = new Blockchain();

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

  res.json({
    status: "success",
    data: {
      block,
    },
  });
});

app.listen(3000, () => {
  console.log("> Ready on port 3000.");
});
