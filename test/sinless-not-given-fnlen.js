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

function asyncError (a, b, cb) {
  setImmediate(function () { cb(new Error('oops')); });
}

test('\nnot given len - sync add returning result', function (t) {
  var finishedLoop;  

  var sinlessAdd = sinless(syncAdd);
  t.notEqual(sinlessAdd, syncAdd, 'async version is created')

  sinlessAdd(1, 3, function (err, res) {
    t.notOk(err, 'no error')
    t.equal(res, 4, 'calls back with returned result')
    t.ok(finishedLoop, 'calls back asynchronously')
    t.end()
  })
  finishedLoop = true;
})

test('\nnot given len - sync add throwing error', function (t) {
  var finishedLoop;  

  var sinlessError = sinless(syncError);
  t.notEqual(sinlessError, syncError, 'async version is created')

  sinlessError(1, 3, function (err, res) {
    t.ok(err, 'propagates error')
    t.ok(finishedLoop, 'calls back asynchronously')
    t.end()
  })
  finishedLoop = true;
})

test('\nnot given len - already async add gets wrapped and called directly', function (t) {
  var finishedLoop;

  var sinlessAdd = sinless(asyncAdd);
  t.notEqual(sinlessAdd, asyncAdd, 'wrapped async version is created')

  sinlessAdd(1, 3, function (err, res) {
    t.notOk(err, 'no error')
    t.equal(res, 4, 'calls back with returned result')
    t.ok(finishedLoop, 'calls back asynchronously')
    t.end()
  })
  finishedLoop = true;
})

test('\nnot given len - async add throwing error', function (t) {
  var finishedLoop;  

  var sinlessError = sinless(asyncError);
  t.notEqual(sinlessError, asyncError, 'async wrapped version is created')

  sinlessError(1, 3, function (err, res) {
    t.ok(err, 'propagates error')
    t.ok(finishedLoop, 'calls back asynchronously')
    t.end()
  })
  finishedLoop = true;
})
