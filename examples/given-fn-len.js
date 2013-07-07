'use strict';

var sinless = require('..')

function syncAdd (a, b) {
  return a + b;
}

var sinlessAdd = sinless(syncAdd, 3);
sinlessAdd(1, 3, function (err, res) {
  if (err) return console.error('err', err);
  console.log('res', res);
})
