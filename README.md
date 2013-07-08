# sinless [![build status](https://secure.travis-ci.org/thlorenz/sinless.png)](http://travis-ci.org/thlorenz/sinless)

[![testling badge](https://ci.testling.com/thlorenz/sinless.png)](https://ci.testling.com/thlorenz/sinless)

**sinless** [ˈsɪnlɪs]
*free from sin or guilt; innocent; pure*

Adapts sync functions to expose async api and leaves async functions unchanged.

```js
var sinless = require('sinless')

function syncAdd (a, b) {
  return a + b;
}

// fn takes 3 args if it is async and has a callback 
var sinlessAdd = sinless(syncAdd, 3); 
sinlessAdd(1, 3, function (err, res) {
  if (err) return console.error('err', err);
  console.log('res', res);
})

// res: 4
```

```js
// although it makes deducing fn's asynchronousity more solid, supplying number of args is optional
// Therefore the below also works assuming that syncAdd's number of arguments is constant
var sinlessAdd = sinless(syncAdd); 
```

## Installation

    npm install sinless

## Features

- consume identical API while giving function implementers the option to return synchronously or callback asynchronously [see
  example]()
- **does not make sync calls async**, i.e. `fs.readFileSync` will still block

## API

### *sinlessAdd(fn, lenWithCb)*

```
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
```

## License

MIT
