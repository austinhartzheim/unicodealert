var self = require('sdk/self');
var tabs = require('sdk/tabs');
var panel = require('sdk/panel');

// Check if unicode is contained in a string
// Also allows checks for suspicious ASCII characters.
function containsSuspiciousCharacter(str) {
    return (/[^\x1f-\x7f]/g.test(str)) ? true: false;
}
exports.containsSuspiciousCharacter = containsSuspiciousCharacter;

// Check a tab object for a suspicious URL and display warnings
function checkTab(tab) {
    console.log(tab.url);
    if (containsSuspiciousCharacter(tab.url)) {
        console.log("WARNING: Suspicious URL required.");
        var warningPanel = panel.Panel({
            width: 533,
            height: 200,
            contentURL: self.data.url('warning.html'),
            contentScriptFile: self.data.url('warning.js')
        });
        warningPanel.port.on('close', function(data) {
            console.log('Attempting to destroy port.');
            warningPanel.destroy();
        });
        warningPanel.port.on('leave', function(data) {
            console.log(tab);
            tab.url = self.data.url('explain.html');
            warningPanel.destroy();
        });
        warningPanel.port.emit('url', tab.url);
        warningPanel.show();
    }
}

function setupTabTracking() {
    tabs.on('open', function onOpen(tab) {
        checkTab(tab);
    });
    tabs.on('ready', function onReady(tab) {
        checkTab(tab);
    });
    
}

setupTabTracking();
