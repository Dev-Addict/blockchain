const cryptoHash = require("../crypto-hash");

describe("cryptoHash()", () => {
  it("Generates a SHA-256 hashed output.", () => {
    expect(cryptoHash("foo")).toEqual(
      "4bca2b137edc580fe50a88983ef860ebaca36c857b1f492839d6d7392452a63c82cbebc68e3b70a2a1480b4bb5d437a7cba6ecf9d89f9ff3ccd14cd6146ea7e7"
    );
  });

  it("Generates same hash with the same input arguments in any order.", () => {
    expect(cryptoHash("foo1", "foo2", "foo3")).toEqual(
      cryptoHash("foo2", "foo3", "foo1")
    );
  });
});
