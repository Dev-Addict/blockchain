const express = require("express");

const Blockchain = require("./blockchain");

const app = express();

const blockchain = new Blockchain();

app.get("/api/v1/blocks", (req, res) => {
  res.json({
    status: "success",
    data: {
      blocks: blockchain.chain,
    },
  });
});

app.listen(3000, () => {
  console.log("> Ready on port 3000.");
});
