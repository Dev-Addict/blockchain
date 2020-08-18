const Wallet = require("../../wallet");
const verifySignature = require("../../utils/verifySignature");

describe("Wallet", () => {
  let wallet;

  beforeEach(() => {
    wallet = new Wallet();
  });

  it("Has a `balance`.", () => {
    expect(wallet).toHaveProperty("balance");
  });

  it("Has a `publicKey`.", () => {
    expect(wallet).toHaveProperty("publicKey");
  });

  describe("Signing data.", () => {
    const data = "data";

    it("Verifies a signature.", () => {
      expect(
        verifySignature({
          publicKey: wallet.publicKey,
          data,
          signature: wallet.sign(data),
        })
      ).toBe(true);
    });

    it("Doesn't verify invalid signature", () => {
      expect(
        verifySignature({
          publicKey: wallet.publicKey,
          data,
          signature: new Wallet().sign(data),
        })
      ).toBe(false);
    });
  });
});
