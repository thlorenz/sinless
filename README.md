# sinless [![build status](https://secure.travis-ci.org/thlorenz/sinless.png)](http://travis-ci.org/thlorenz/sinless)

[![testling badge](https://ci.testling.com/thlorenz/sinless.png)](https://ci.testling.com/thlorenz/sinless)

**sinless** [ˈsɪnlɪs]
*free from sin or guilt; innocent; pure*

Wraps sync functions to make them non-blocking and leaves async functions unchanged.

```js
var sinless = require('sinless')

function syncAdd (a, b) {
  return a + b;
}

var sinlessAdd = sinless(syncAdd, 3);
sinlessAdd(1, 3, function (err, res) {
  if (err) return console.error('err', err);
  console.log('res', res);
})

// res: 4
```

## Status

**Alpha** use at your own risk ;).
Partially implemented, aynchronousity deduced by function length at this point.

## Installation

    npm install sinless

## API


## License

MIT
