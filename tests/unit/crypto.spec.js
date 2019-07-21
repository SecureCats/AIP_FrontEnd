import {
  keygen,
  generate_32_bit_hex,
  generate_random_bigint,
  H
} from "@/crypto";

describe("crypto mod", () => {
  it("generate_32_bit_hex work as expect, get 8 Byte hex string", () => {
    let h = generate_32_bit_hex();
    for (let i = 0; i < 1000; i += 1) expect(h.length).toEqual(8);
  });
  it("generate_bitint must generate exact length i want", () => {
    let bitNum = "";
    for (let i = 0; i < 1024 / 32; i += 1) {
      let ret = generate_32_bit_hex();
      expect(ret.length).toEqual(8);
      bitNum += ret;
      expect(bitNum.length).toEqual((i + 1) * 8);
    }

    expect(generate_random_bigint(1024).toString(16).length * 4).toEqual(1024);
    expect(generate_random_bigint(2048).toString(16).length * 4).toEqual(2048);
    expect(generate_random_bigint(4096).toString(16).length * 4).toEqual(4096);
    expect(generate_random_bigint(4096).toString(16).length * 4).toEqual(4096);
    expect(generate_random_bigint(4096).toString(16).length * 4).toEqual(4096);
    expect(generate_random_bigint(4096).toString(16).length * 4).toEqual(4096);
    expect(generate_random_bigint(4096).toString(16).length * 4).toEqual(4096);
  });
  it("Hash func work as expect", () => {
    expect(H(1).toString()).toEqual("149138774");
  });
  it("keygen works", () => {
    keygen({
      a: "111",
      b: "34",
      g: "34",
      h: "34",
      n: "34"
    });
  });
});
