const Blockchain = require("../blockchain");
const Block = require("../block");

describe("Blockchain", () => {
  let blockchain = new Blockchain();

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  it("Contains A `chain` Array instance", () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });

  it("Starts with genesis block.", () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it("Adds a new block to chain.", () => {
    const data = "foo";
    blockchain.addBlock({ data });

    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(data);
  });

  describe("isValidChain()", () => {
    describe("When the chain doesn't start with the genesis block.", () => {
      it("Return false.", () => {
        blockchain.chain[0] = { data: "fake-genesis" };

        expect(blockchain.isChainValid()).toBe(false);
      });
    });

    describe("When chain starts with genesis and has multiple blocks.", () => {
      beforeEach(() => {
        blockchain.addBlock({ data: "data1" });
        blockchain.addBlock({ data: "data2" });
        blockchain.addBlock({ data: "data3" });
      });

      describe("And a `lastHash` reference has changed.", () => {
        it("Returns false.", () => {
          blockchain.chain[2].lastHash = "broken-hash";

          expect(blockchain.isChainValid()).toBe(false);
        });
      });

      describe("And the chain contains a block with an invalid field.", () => {
        it("Returns false.", () => {
          blockchain.chain[0].data = "bad-data";

          expect(blockchain.isChainValid()).toBe(false);
        });
      });

      describe("And the chain does not contain any invalid blocks", () => {
        it("Returns true", () => {
          expect(blockchain.isChainValid()).toBe(true);
        });
      });
    });
  });
});
