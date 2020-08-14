const Block = require("../block");
const { GENESIS_DATA } = require("../config");
const cryptoHash = require("../crypto-hash");

describe("Block", () => {
  const timestamp = Date.now();
  const lastHash = "lastHash";
  const hash = "hash";
  const data = ["blockchain", "data"];
  const nonce = 1;
  const difficulty = 1;
  const block = new Block({
    timestamp,
    lastHash,
    hash,
    data,
    nonce,
    difficulty,
  });

  it("Has timestamp, lastHash, hash and data property.", () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
    expect(block.nonce).toEqual(nonce);
    expect(block.difficulty).toEqual(difficulty);
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

    it("Sets the `lastHash` to be `hash` of the lastBlock.", () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });

    it("Sets the `data`.", () => {
      expect(minedBlock.data).toEqual(data);
    });

    it("Sets a `timestamp`", () => {
      expect(minedBlock.timestamp).not.toEqual(undefined);
    });

    it("Creates SHA3-512 `hash` based on inputs.", () => {
      expect(minedBlock.hash).toEqual(
        cryptoHash(
          minedBlock.timestamp,
          minedBlock.nonce,
          minedBlock.difficulty,
          lastBlock.hash,
          data
        )
      );
    });

    it("Sets `hash` that matches difficulty criteria.", () => {
      expect(minedBlock.hash.substring(0, minedBlock.difficulty)).toEqual(
        "0".repeat(minedBlock.difficulty)
      );
    });
  });
});
