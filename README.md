# bundl-pack-less

*Package files in [bundl-pack](https://github.com/seebigs/bundl-pack) that end in `.less`*

> Learn more at [lesscss.org](http://lesscss.org/)

## Install

```
$ npm install --save-dev bundl-pack-less
```

## Use

```js
var bundl = require('bundl');
var pack = require('bundl-pack');
var write = require('bundl-write');

var lessProcessor = require('bundl-pack-less');

var options = {
    relativeUrls: false
};

bundl('entry.js')
    .then(pack({ less: lessProcessor(options) }))
    .then(write())
    .go();
```
