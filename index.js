'use strict';

/*global setImmediate*/
require('setimmediate');

var slice = Array.prototype.slice;

function runAsync (fn, args, cb) {
  try {
    var res = fn.apply(this, args);
    setImmediate(cb.bind(null, null, res));
  } catch (err) {
    setImmediate(cb.bind(null, err));
  }
}

function wrapperWithoutLen (fn) {
  return function () {
    var args =  slice.call(arguments)

    // if the given function has at least as many arguments as we are passed,
    // we assume that its last argument is a callback and it is therefore async already
    if (args.length <= fn.length) return fn.apply(this, args);

    var cb = args.pop();

    runAsync.call(this, fn, args, cb);
  };
}

function wrapperWithLen (fn, lenWithCb) {
  var isAsync = fn.length === lenWithCb;
  return isAsync 
    ? fn 
    : function () {
        var args =  slice.call(arguments)
          , cb   =  args.pop();

        runAsync.call(this, fn, args, cb);
      };
}

var sinless = module.exports = function (fn, lenWithCb) {
  return lenWithCb ? wrapperWithLen(fn, lenWithCb) : wrapperWithoutLen(fn);
};
