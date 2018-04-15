'use strict';

const MODE_ZWSP = 0;
const MODE_FULL = 1;

const ZERO_WIDTH_SPACE = '\u200b';
const ZERO_WIDTH_NON_JOINER = '\u200c';
const ZERO_WIDTH_JOINER = '\u200d';
const LEFT_TO_RIGHT_MARK = '\u200e';
const RIGHT_TO_LEFT_MARK = '\u200f';

const listZWSP = [
    ZERO_WIDTH_SPACE,
    ZERO_WIDTH_NON_JOINER,
    ZERO_WIDTH_JOINER,
];

const listFull = [
    ZERO_WIDTH_SPACE,
    ZERO_WIDTH_NON_JOINER,
    ZERO_WIDTH_JOINER,
    LEFT_TO_RIGHT_MARK,
    RIGHT_TO_LEFT_MARK,
];

function getPaddingLength(mode) {
    return (mode === MODE_ZWSP) ? 11 : 7; // Keep padding as small as possible
}

function encode(message, mode = MODE_FULL) {
    if ('string' !== typeof message) {
        throw new TypeError('Cannot encode '+typeof message+'s!');
    }
    let alphabet = (mode === MODE_ZWSP) ? listZWSP : listFull;
    let padding = getPaddingLength(mode);
    let encoded = '';
    if (message.length === 0) {
        return '';
    }

    for (let i = 0; i < message.length; i++) {
        let code = '0'.repeat(padding) + message.charCodeAt(i).toString(alphabet.length);
        code = code.substr(code.length-padding);
        for (let j = 0; j < code.length; j++) {
            let index = parseInt(code.charAt(j));
            encoded += alphabet[index];
        }
    }
    return encoded;
}

function decode(message, mode = MODE_FULL) {
    if ('string' !== typeof message) {
        throw new TypeError('Cannot decode '+typeof message+'s!');
    }
    let alphabet = (mode === MODE_ZWSP) ? listZWSP : listFull;
    let padding = getPaddingLength(mode);
    let encoded = '', decoded = '';

    for (let i = 0; i < message.length; i++) {
        if (alphabet.includes(message.charAt(i))) {
            encoded += alphabet.indexOf(message.charAt(i)).toString();
        }
    }

    if (encoded.length % padding !== 0) {
        throw new TypeError('Unknown encoding detected!');
    }

    let curEncodedChar = '';
    for (let i = 0; i < encoded.length; i++) {
        curEncodedChar += encoded.charAt(i);
        if (i > 0 && (i+1) % padding === 0) {
            decoded += String.fromCharCode(parseInt(curEncodedChar, alphabet.length));
            curEncodedChar = '';
        }
    }

    return decoded;
}

module.exports = {
    MODE_ZWSP: MODE_ZWSP,
    MODE_FULL: MODE_FULL,
    encode: (s, m) => encode(s, m),
    decode: (s, m) => decode(s, m),
};