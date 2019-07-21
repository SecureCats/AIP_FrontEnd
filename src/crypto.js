var bigInt = require("../node_modules/big-integer/BigInteger");
var sha256 = require("../node_modules/js-sha256");

let generate_32_bit_hex = () =>
  Math.random()
    .toString(15)
    .substring(5, 5 + 8);
let generate_random_bigint = length => {
  let bitNum = "";
  for (let i = 0; i < length / 32; i += 1) bitNum += generate_32_bit_hex();
  return bigInt(bitNum, 16);
};

let H = x => bigInt(sha256(x.toString()), 16).mod(731499577);

let keygen = pubkey => {
  Object.keys(pubkey).forEach(key => {
    pubkey[key] = bigInt(pubkey[key]);
  });
  let a = pubkey.a;
  let b = pubkey.b;
  let g = pubkey.g;
  let h = pubkey.h;
  let n = pubkey.n;

  let uk = generate_random_bigint(32);
  let r = generate_random_bigint(32);
  let r1 = generate_random_bigint(32);
  let r2 = generate_random_bigint(32);

  let C = a
    .modPow(uk, n)
    .times(b.modPow(r, n))
    .mod(n);

  let y = a
    .modPow(r1, n)
    .times(b.modPow(r2, n))
    .mod(n)
    .toString();

  let x = H(C.times(g).times(h));

  let z1 = r1.add(x.times(uk)).toString();
  let z2 = r2.add(x.times(r)).toString();
  x = x.toString();
  r = r.toString();
  uk = uk.toString();
  C = C.toString();
  return {
    x,
    y,
    C,
    z1,
    z2,
    uk,
    r
  };
};

export { keygen, generate_32_bit_hex, generate_random_bigint, H };
