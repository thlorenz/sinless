'use strict';

// pull out setimmediate instead of attaching it to the global --- ugh

if (typeof global.setImmediate === 'function') {
  module.exports = global.setImmediate;
} else {
  require('setimmediate');
  module.exports = global.setImmediate;
  delete global.setImmediate;
}
