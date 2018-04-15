'use strict';

const Steganography = require('./src/Steganography');

module.exports = {
    MODE_ZWSP: Steganography.MODE_ZWSP,
    MODE_FULL: Steganography.MODE_FULL,
    encode: (s, m = Steganography.MODE_FULL) => Steganography.encode(s, m),
    decode: (s, m = Steganography.MODE_FULL) => Steganography.decode(s, m),
};