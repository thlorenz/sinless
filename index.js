'use strict';

/*global setImmediate*/
require('setimmediate');

var slice = Array.prototype.slice;

function asyncify (fn) {
  return function () {
    var args =  slice.call(arguments)
      , cb   =  args.pop();

    try {
      var res = fn.apply(this, args);
      setImmediate(cb.bind(null, null, res));
    } catch (err) {
      setImmediate(cb.bind(null, err));
    }

  }.bind(this);
}

function wrapperWithLen (fn, lenWithCb) {
  var isAsync = fn.length === lenWithCb;
  return isAsync ? fn : asyncify(fn);
}

var sinless = module.exports = function (fn, lenWithCb) {
  return wrapperWithLen(fn, lenWithCb);
};

function syncAdd (a, b) {
  return a + b;
}

function asyncAdd (a, b, cb) {
  setImmediate(function () { cb(null, a + b) });
}

var res = syncAdd( 1, 2);

var sinlessAdd = sinless(syncAdd, 3);
sinlessAdd(1, 3, function (err, res) {
  console.error('err: ', err);
  console.error('res: ', res);
});
