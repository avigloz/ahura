const x = require("./index.js")('test');
const y = require("./index.js")();
const assert = require('assert');

console.log("imp x:", x);
assert(x.isEqual);
assert(x.shuffle);
assert(x.includes);
assert(x.sample);
console.log("lodash.isEqual(1, 2):", x.isEqual(1, 2));
console.log("lodash.shuffle([1, 2, 3, 4, 5]):", x.shuffle([1, 2, 3, 4, 5]))

console.log("imp y:", y)
assert(y.includes);
assert(y.sample);
assert(!y.isEqual);
assert(!y.shuffle);