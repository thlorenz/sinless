'use strict';
/*jshint asi: true */

/*global setImmediate*/
require('setimmediate');

var test = require('tape')
var sinless = require('..')

function syncAdd (a, b) {
  return a + b;
}

function syncError (a, b) {
  throw new Error('oops');
}

function asyncAdd (a, b, cb) {
  setImmediate(function () { cb(null, a + b); });
}

test('\ngiven len - sync add returning result', function (t) {
  var finishedLoop;  

  var sinlessAdd = sinless(syncAdd, 3);
  t.notEqual(sinlessAdd, syncAdd, 'async version is created')

  sinlessAdd(1, 3, function (err, res) {
    t.notOk(err, 'no error')
    t.equal(res, 4, 'calls back with returned result')
    t.ok(finishedLoop, 'calls back asynchronously')
    t.end()
  })
  finishedLoop = true;
})

test('\ngiven len - sync add throwing error', function (t) {
  var finishedLoop;  

  var sinlessError = sinless(syncError, 3);
  t.notEqual(sinlessError, syncError, 'async version is created')

  sinlessError(1, 3, function (err, res) {
    t.ok(err, 'propagates error')
    t.ok(finishedLoop, 'calls back asynchronously')
    t.end()
  })
  finishedLoop = true;
})

test('\ngiven len - already async add gets passed thru', function (t) {
  var sinlessAdd = sinless(asyncAdd, 3);
  t.equal(sinlessAdd, asyncAdd, 'no async version is created')
  t.end()
})
