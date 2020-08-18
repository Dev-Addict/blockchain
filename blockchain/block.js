const { GENESIS_DATA, MINE_RATE } = require("../config");
const cryptoHash = require("../utils/crypto-hash");
const hexbin = require("../utils/hexbin");

class Block {
  static genesis() {
    return new this(GENESIS_DATA);
  }

  static adjustDifficulty({ block: { difficulty, ...block }, timestamp }) {
    let finalDifficulty = difficulty + 1;

    if (timestamp - block.timestamp > MINE_RATE)
      finalDifficulty = difficulty - 1;

    if (finalDifficulty < 1) {
      return 1;
    }

    return finalDifficulty;
  }

  static mineBlock({ lastBlock, data }) {
    let hash, timestamp;

    let { difficulty } = lastBlock;

    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty({ block: lastBlock, timestamp });
      hash = cryptoHash(timestamp, lastBlock.hash, data, nonce, difficulty);
    } while (!/^0*$/.test(hexbin(hash).substring(0, difficulty)));

    return new this({
      timestamp,
      lastHash: lastBlock.hash,
      hash,
      data,
      difficulty,
      nonce,
    });
  }

  constructor({ timestamp, lastHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }
}

module.exports = Block;
