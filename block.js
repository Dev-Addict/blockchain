const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./crypto-hash");

class Block {
  static genesis() {
    return new this(GENESIS_DATA);
  }

  static mineBlock({ lastBlock: { hash }, data }) {
    const timestamp = Date.now();

    return new this({
      timestamp,
      lastHash: hash,
      hash: cryptoHash(timestamp, hash, data),
      data,
    });
  }

  constructor({ timestamp, lastHash, hash, data }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }
}

module.exports = Block;
