const BlockChain = require("../blockchain");

const blockchain = new Blockchain();

blockchain.addBlock({ data: "initial" });

let prevTimestamp, nextTimestamp, nextBlock, timeDifference, average;

const times = [];

for (let i = 0; i < 10000; i++) {
  prevTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp;

  blockchain.addBlock({ data: `block ${i}` });

  nextBlock = blockchain.chain[blockchain.chain.length - 1];

  nextTimestamp = nextBlock.timestamp;

  timeDifference = nextTimestamp - prevTimestamp;

  times.push(timeDifference);

  average = times.reduce((total, index) => total + index) / times.length;

  console.log(
    `\n\nTime to mine block: ${timeDifference}ms.\nDifficulty: ${nextBlock.difficulty}.\nAverage time: ${average}ms.\n\n`
  );
}
