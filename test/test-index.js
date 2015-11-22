var main = require("../");

exports["test containsUnicode"] = function(assert, done) {
    assert.ok(main.containsUnicode("hello") === false,
              "Returned false when unicode not in string.");
    assert.ok(main.containsUnicode("á") === true,
              "Returned true when unicode in string.");
    done();
};

require("sdk/test").run(exports);
