const ellipticCrypto = require("./elliptic-crypto");
const cryptoHash = require("./crypto-hash");

const verifySignature = ({ publicKey, data, signature }) => {
  const keyFromPublic = ellipticCrypto.keyFromPublic(publicKey, "hex");

  return keyFromPublic.verify(cryptoHash(data), signature);
};

module.exports = verifySignature;
