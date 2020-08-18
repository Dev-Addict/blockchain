const { STARTING_BALANCE } = require("../config");
const ellipticCrypto = require("../utils/elliptic-crypto");
const cryptoHash = require("../utils/crypto-hash");

class Wallet {
  constructor() {
    this.balance = STARTING_BALANCE;
    this.keyPair = ellipticCrypto.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode("hex");
  }

  sign(data) {
    return this.keyPair.sign(cryptoHash(data));
  }
}

module.exports = Wallet;
