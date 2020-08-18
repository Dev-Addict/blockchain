const EllipticCrypto = require("elliptic").ec;

const ellipticCrypto = new EllipticCrypto("secp256k1");

module.exports = ellipticCrypto;
