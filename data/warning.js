self.port.on('url', function(data) {
    tn = document.createTextNode(data);
    document.getElementById('url').appendChild(tn);
});

document.getElementById('close').addEventListener('click', function() {
    self.port.emit('close', true);
});

document.getElementById('leave').addEventListener('click', function() {
    self.port.emit('leave', true);
});
