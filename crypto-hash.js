const crypto = require("crypto");

const cryptoHash = (...args) => {
  return crypto
    .createHash("sha256")
    .update(args.sort().join(" "))
    .digest("hex");
};

module.exports = cryptoHash;
