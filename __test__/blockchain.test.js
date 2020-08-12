const Blockchain = require("../blockchain");
const Block = require("../block");

describe("Blockchain", () => {
  const blockchain = new Blockchain();

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
});
