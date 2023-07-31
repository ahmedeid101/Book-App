 var sequential = require("sequential-ids");

var generator = new sequential.Generator({
    digit: 3,
    restore: '000'
});

generator.start();

module.exports = generator;