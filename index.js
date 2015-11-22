var self = require('sdk/self');

// Check if unicode is contained in a string
function containsUnicode(str) {
    return (/[^\x05-\x7f]/g.test(str)) ? true: false;
}
exports.containsUnicode = containsUnicode;

