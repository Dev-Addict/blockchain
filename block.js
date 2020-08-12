const { GENESIS_DATA } = require("./config");

class Block {
  static genesis() {
    return new this(GENESIS_DATA);
  }

  constructor({ timestamp, lastHash, hash, data }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }
}

module.exports = Block;
