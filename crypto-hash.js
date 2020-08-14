const crypto = require("crypto");

const cryptoHash = (...args) => {
  return crypto
    .createHash("sha3-512")
    .update(args.sort().join(" "))
    .digest("hex");
};

module.exports = cryptoHash;
