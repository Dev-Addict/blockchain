const Block = require("../block");
const { GENESIS_DATA } = require("../config");

describe("Block", () => {
  const timestamp = Date.now();
  const lastHash = "lastHash";
  const hash = "hash";
  const data = ["blockchain", "data"];
  const block = new Block({
    timestamp,
    lastHash,
    hash,
    data,
  });

  it("Has timestamp, lastHash, hash and data property.", () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
  });

  describe("genesis()", () => {
    const genesisBlock = Block.genesis();

    it("Returns a block instance.", () => {
      expect(genesisBlock instanceof Block).toBe(true);
    });

    it("Returns the genesis data.", () => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });

  describe("mineBlock()", () => {
    const lastBlock = Block.genesis();
    const data = "mined data";
    const minedBlock = Block.mineBlock({ lastBlock, data });

    it("Returns a block instance.", () => {
      expect(minedBlock instanceof Block).toBe(true);
    });

    it("sets the `lastHash` to be `hash` of the lastBlock.", () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });

    it("sets the `data`.", () => {
      expect(minedBlock.data).toEqual(data);
    });

    it("sets a `timestamp`", () => {
      expect(minedBlock.timestamp).not.toEqual(undefined);
    });
  });
});
