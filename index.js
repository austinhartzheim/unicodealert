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
        console.log("Suspicious URL temporarily ignored:", tab.url);
    } else if (containsSuspiciousCharacter(url.host)) {
        console.log("Suspicious URL", tab.url);
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
    tabs.on('open', function onOpen(tab) {
        checkTab(tab);
    });
    tabs.on('ready', function onReady(tab) {
        checkTab(tab);
    });
    
}

setupTabTracking();
