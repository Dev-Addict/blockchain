const Transaction = require("../../wallet/transaction");
const Wallet = require("../../wallet");

describe("Transaction", () => {
  let transaction, senderWallet, recipient, amount;

  beforeEach(() => {
    senderWallet = new Wallet();
    recipient = "recipient-public-key";
    amount = 50;
    transaction = new Transaction({ senderWallet, recipient, amount });
  });

  it("Has an `id`.", () => {
    expect(transaction).toHaveProperty("id");
  });

  describe("outputMap", () => {
    it("Has an `outputMap.", () => {
      expect(transaction).toHaveProperty("outputMap");
    });

    it("Outputs the amount to the recipient.", () => {
      expect(transaction.outputMap[recipient]).toEqual(amount);
    });

    it("outputs the remaining balance for the `senderWallet`.", () => {
      expect(transaction.outputMap[senderWallet.publicKey]).toEqual(
        senderWallet.balance - amount
      );
    });
  });
});