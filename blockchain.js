const Block = require("./block");
const cryptoHash = require("./crypto-hash");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }) {
    const block = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data,
    });

    this.chain.push(block);
  }

  isChainValid() {
    if (JSON.stringify(this.chain[0]) !== JSON.stringify(Block.genesis()))
      return false;

    for (let i = 1; i < this.chain.length; i++) {
      const { timestamp, lastHash, hash, data } = this.chain[i];

      const actualLastHash = this.chain[i - 1].hash;

      if (lastHash !== actualLastHash) return false;

      const validHash = cryptoHash(timestamp, lastHash, data);

      if (hash !== validHash) return false;
    }

    return true;
  }
}

module.exports = Blockchain;
