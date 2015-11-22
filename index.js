var self = require('sdk/self');
var tabs = require('sdk/tabs');

// Check if unicode is contained in a string
// Also allows checks for suspicious ASCII characters.
function containsSuspiciousCharacter(str) {
    return (/[^\x1f-\x7f]/g.test(str)) ? true: false;
}
exports.containsSuspiciousCharacter = containsSuspiciousCharacter;
