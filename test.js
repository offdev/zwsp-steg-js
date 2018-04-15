const steg = require('./index');
const test = require('ava');

const testCases = {
    EMPTY_STRING: '',
    ASCII: 'This is some generic string!',
    MULTIBYTE_CHARS: '𠜎𠜱𠝹𠱓𠱸𠲖𠳏𠳕𩶘',
    LOWEST_UNICODE: '\u0000',
    HIGHEST_UNICODE: '\uffff',
    LOWEST_AND_HIGHEST_UNICODE: '\u0000\uffff',
};

const testFn = (mode, m) => t => {
    const e = steg.encode(m, mode);
    const d = steg.decode(e, mode);
    t.is(d, m);
};

const testFnFailEncode = (mode, m) => t => {
    const error = t.throws(() => {
        steg.encode(m, mode);
    }, TypeError);

    t.is(error.message, 'Cannot encode numbers!');
};

const testFnFailDecode = (mode, m) => t => {
    const error = t.throws(() => {
        steg.decode(m, mode);
    }, TypeError);

    t.is(error.message, 'Cannot decode numbers!');
};

const testFnWrongEncoding = (e) => t => {
    const encoding1 = (e !== steg.MODE_ZWSP ? steg.MODE_FULL : steg.MODE_ZWSP);
    const encoding2 = (e !== steg.MODE_ZWSP ? steg.MODE_ZWSP : steg.MODE_FULL);
    const error = t.throws(() => {
        let e = steg.encode('a', encoding1);
        steg.decode(e, encoding2);
    }, TypeError);

    t.is(error.message, 'Unknown encoding detected!');
};

Object.keys(testCases).forEach((k) => {
    let m = testCases[k];
    test(k+ ' (MODE_ZWSP)', testFn(steg.MODE_ZWSP, m));
    test(k+ ' (MODE_FULL)', testFn(steg.MODE_FULL, m));
});

test('ENCODE_NON_STRING_THROWS (MODE_ZWSP)', testFnFailEncode(steg.MODE_ZWSP, 0));
test('DECODE_NON_STRING_THROWS (MODE_ZWSP)', testFnFailDecode(steg.MODE_ZWSP, 0));
test('ENCODE_NON_STRING_THROWS (MODE_FULL)', testFnFailEncode(steg.MODE_FULL, 0));
test('DECODE_NON_STRING_THROWS (MODE_FULL)', testFnFailDecode(steg.MODE_FULL, 0));
test('DECODE_WRONG_ENCODING_THROWS (MODE_ZWSP->MODE_FULL)', testFnWrongEncoding(steg.MODE_ZWSP));
test('DECODE_WRONG_ENCODING_THROWS (MODE_FULL->MODE_ZWSP)', testFnWrongEncoding(steg.MODE_FULL));