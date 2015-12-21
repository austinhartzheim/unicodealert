var self = require('sdk/self');
var tabs = require('sdk/tabs');
var urls = require('sdk/url');
var panel = require('sdk/panel');

// List of dimains ignored for this session
var ignoredDomains = [];

// Check if unicode is contained in a string
// Also allows checks for suspicious ASCII characters
function containsSuspiciousCharacter(str) {
    return (/[^\x1f-\x7f]/g.test(str)) ? true: false;
}
exports.containsSuspiciousCharacter = containsSuspiciousCharacter;

// Check a tab object for a suspicious URL and display warnings
function checkTab(tab) {
    var url = urls.URL(tab.url);
    
    if (ignoredDomains.indexOf(url.host) > -1) {
        // This domain was already ignored by the user
    } else if (containsSuspiciousCharacter(url.host)) {
        var warningPanel = panel.Panel({
            width: 533,
            height: 200,
            contentURL: self.data.url('warning.html'),
            contentScriptFile: self.data.url('warning.js')
        });
        warningPanel.port.on('leave', function(data) {
            tab.url = self.data.url('explain.html');
            warningPanel.destroy();
        });
        warningPanel.port.on('ignore', function(data) {
            ignoredDomains.push(url.host);
            warningPanel.destroy();
        });
        warningPanel.port.emit('url', tab.url);
        warningPanel.show();
    }
}

// Add events to track tabs on open and ready states
function setupTabTracking() {
    tabs.on('ready', function onOpen(tab) {
        // A page was loaded. If it is the active tab, check it now.
        //   Otherwise, it will be checked upon activation.
        if (tab == tabs.activeTab)
            checkTab(tab);
    });
    tabs.on('activate', function onReady(tab) {
        checkTab(tab);
    });
    
}

setupTabTracking();
