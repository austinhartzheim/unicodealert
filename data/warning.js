self.port.on('url', function(data) {
    var tn = document.createTextNode(data);
    document.getElementById('url').appendChild(tn);
});

document.getElementById('ignore').addEventListener('click', function() {
    self.port.emit('ignore', true);
});

document.getElementById('leave').addEventListener('click', function() {
    self.port.emit('leave', true);
});
