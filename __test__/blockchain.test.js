const Blockchain = require("../blockchain");
const Block = require("../block");
const cryptoHash = require("../crypto-hash");

describe("Blockchain", () => {
  let blockchain, secondChain, originalChain;

  beforeEach(() => {
    blockchain = new Blockchain();

    originalChain = blockchain.chain;

    secondChain = new Blockchain();
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

  describe("isChainValid()", () => {
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

      describe("And the chain contains a block with a jumped difficulty.", () => {
        it("Returns false.", () => {
          const lastBlock = blockchain.chain[blockchain.chain.length - 1];
          const lastHash = lastBlock.hash;
          const timestamp = Date.now();
          const nonce = 0;
          const data = [];
          const difficulty = lastBlock.difficulty - 3;

          const hash = cryptoHash(timestamp, lastHash, difficulty, nonce, data);

          const invalidBlock = new Block({
            lastHash,
            timestamp,
            nonce,
            data,
            difficulty,
            hash,
          });

          blockchain.chain.push(invalidBlock);

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

  describe("replaceChain()", () => {
    describe("When the chain is not longer than old chain.", () => {
      it("Doesn't replace the chain.", () => {
        blockchain.replaceChain(secondChain.chain);

        expect(blockchain.chain).toEqual(originalChain);
      });
    });

    describe("When the chain is longer than old chain.", () => {
      beforeEach(() => {
        secondChain.addBlock({ data: "data1" });
        secondChain.addBlock({ data: "data2" });
        secondChain.addBlock({ data: "data3" });
      });

      describe("And the chain is invalid.", () => {
        it("Doesn't replace the chain.", () => {
          secondChain.chain[2].hash = "wrong-hash";

          blockchain.replaceChain(secondChain.chain);

          expect(blockchain.chain).toEqual(originalChain);
        });
      });

      describe("And the chain is valid.", () => {
        it("Replaces the chain.", () => {
          blockchain.replaceChain(secondChain.chain);

          expect(blockchain.chain).toEqual(secondChain.chain);
        });
      });
    });
  });
});
