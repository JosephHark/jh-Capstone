[![view on npm](https://badgen.net/npm/v/sleep-anywhere)](https://www.npmjs.org/package/sleep-anywhere)
[![npm module downloads](https://badgen.net/npm/dt/sleep-anywhere)](https://www.npmjs.org/package/sleep-anywhere)
[![Gihub repo dependents](https://badgen.net/github/dependents-repo/75lb/sleep-anywhere)](https://github.com/75lb/sleep-anywhere/network/dependents?dependent_type=REPOSITORY)
[![Gihub package dependents](https://badgen.net/github/dependents-pkg/75lb/sleep-anywhere)](https://github.com/75lb/sleep-anywhere/network/dependents?dependent_type=PACKAGE)
[![Node.js CI](https://github.com/75lb/sleep-anywhere/actions/workflows/node.js.yml/badge.svg)](https://github.com/75lb/sleep-anywhere/actions/workflows/node.js.yml)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

<a name="module_sleep-anywhere"></a>

## sleep-anywhere
A sleep function you can use anywhere.

**Example**  
```js
import sleep from 'sleep-anywhere'

const result = await sleep(5000, 'later')
console.log('5s', result)
// 5s later
```
<a name="exp_module_sleep-anywhere--sleep"></a>

### sleep(ms, [returnValue]) ⇒ <code>Promise</code> ⏏
Returns a promise which fulfils after `ms` milliseconds with the supplied `returnValue`.

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>number</code> | How long in milliseconds to sleep for. |
| [returnValue] | <code>\*</code> | The value to return. |


### Load anywhere

This library is compatible with Node.js, the Web and any style of module loader. It can be loaded anywhere, natively without transpilation.

Node.js CommonJS:

```js
const sleep = require('sleep-anywhere')
```

Node.js ECMAScript Module:

```js
import sleep from 'sleep-anywhere'
```

Within a modern browser ECMAScript Module:

```js
import sleep from './node_modules/sleep-anywhere/index.js'
```

* * *

&copy; 2018-22 Lloyd Brookes \<75pound@gmail.com\>.
