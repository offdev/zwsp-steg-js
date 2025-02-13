# zwsp-steg
Zero-Width Space Steganography. Encodes and decodes hidden messages as non-printable/readable characters.

[![npm](https://img.shields.io/npm/v/zwsp-steg.svg)](https://www.npmjs.com/package/zwsp-steg)
[![Travis](https://img.shields.io/travis/offdev/zwsp-steg-js.svg)](https://travis-ci.org/offdev/zwsp-steg-js)
[![dependencies Status](https://david-dm.org/offdev/zwsp-steg-js/status.svg)](https://david-dm.org/offdev/zwsp-steg-js)
[![devDependencies Status](https://david-dm.org/offdev/zwsp-steg-js/dev-status.svg)](https://david-dm.org/offdev/zwsp-steg-js?type=dev)
[![License](https://img.shields.io/github/license/offdev/zwsp-steg-js.svg)](https://www.apache.org/licenses/LICENSE-2.0)

### Installation
```bash
$ npm install zwsp-steg
```

### Usage Example
```.js
const ZwspSteg = require('zwsp-steg');

let encoded = ZwspSteg.encode('hidden message');
let decoded = ZwspSteg.decode(encoded);

console.log(decoded); // hidden message
```

Note that decoding a message will ignore all non 'special' characters. That means if you hide your message within a readable string, and decode the whole string, you will only return the hidden message.

### Parameters
You can use different sets of characters in different encoding / decoding modes.

```.js
const ZwspSteg = require('zwsp-steg');

ZwspSteg.encode('hidden message', ZwspSteg.MODE_ZWSP);
ZwspSteg.encode('hidden message', ZwspSteg.MODE_FULL);
```

#### Character sets used
- **MODE_ZWSP**: Zero-Width Space (\u200b), Zero-Width Non-Joiner (\u200c), Zero-Width Joiner (\u200d)
- **MODE_FULL**: All MODE_ZWSP characters, Left-To-Right Mark (\u200e), Right-To-Left Mark (\u200f)

### License
[Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)
