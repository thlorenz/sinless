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
  var isAsync = fn.length >= lenWithCb;
  return isAsync 
    ? fn 
    : function () {
        var args =  slice.call(arguments)
          , cb   =  args.pop();

        runAsync.call(this, fn, args, cb);
      };
}

/**
  * Returns an async version of a given function or the function itself if it could be determined to be async already.
  * If lenWithCb is given, the function will be wrapped if the number of its arguments are smaller than this length.
  * If lenWithCb is not given the function will be wrapped whenever it is called with more arguments than it takes. 
  *
  * @name sinless
  * @function
  * @param fn {Function} to be wrapped if it isn't async
  * @param lenWithCb {Number} [optional] number of arguments the function should have if it was async and included a callback
  * @return {Function} either the original function or a wrapped version of it
  */
var sinless = module.exports = function (fn, lenWithCb) {
  return lenWithCb ? wrapperWithLen(fn, lenWithCb) : wrapperWithoutLen(fn);
};
