var main = require("../");

exports["test containsSuspiciousCharacter"] = function(assert, done) {
    var badCharacters = ['\n', '\r', '\b', 'á', 'é', 'í', 'ó', 'ú'];
    for (var i = 0; i < badCharacters.length; i++)
        assert.ok(main.containsSuspiciousCharacter(badCharacters[i]) === true,
                  "Returned true bad character was in string.");
    
    assert.ok(main.containsSuspiciousCharacter("hello") === false,
              "Returned false when unicode not in string.");
    assert.ok(main.containsSuspiciousCharacter("á") === true,
              "Returned true when unicode in string.");
    done();
};

require("sdk/test").run(exports);
