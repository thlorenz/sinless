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

  };
}

function wrapperWithLen (fn, lenWithCb) {
  var isAsync = fn.length === lenWithCb;
  return isAsync ? fn : asyncify(fn);
}

var sinless = module.exports = function (fn, lenWithCb) {
  return wrapperWithLen(fn, lenWithCb);
};

