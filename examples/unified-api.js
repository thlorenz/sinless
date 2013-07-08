'use strict';
var fs = require('fs');
var sinless = require('..');

function add1 (a, b) {
  // we are able to compute result in memory quickly, therefore making this function sync makes sense
  return 'add1 result: ' + (a + b);
}

function add2 (a, b, cb) {
  // we need to add number of files in this directory into account (totally contrived), so async makes sense
  fs.readdir(__dirname, function (err, entries) {
    if (err) return cb(err);
    cb(null, 'add2 result: ' + (a + b + entries.length));
  });
}

function printResult(addFn, a, b) {
  // print result expects the addFn to have an async api
  addFn(a, b, function (err, sum) {
    if (err) return console.error(err);
    console.log(sum);
  });
}

// Although the above functions have a different API we can just wrap them via sinless in order to make sure
// that no matter what the original api is, they will expose the api that 'printResult' expects

printResult(sinless(add1), 1, 2);
printResult(sinless(add2), 1, 2);

// prints 
// add2 result: 6
// add1 result: 3
