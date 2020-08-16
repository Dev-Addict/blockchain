const hexbin = require("../hexbin");

describe("hexbin()", () => {
  it("Returns valid binary number from hex number.", () => {
    expect(hexbin("f21")).toEqual("111100100001");
  });
});
