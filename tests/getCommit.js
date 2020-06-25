const fs = require("fs");

module.exports = function() {
  try {
    return fs.readFileSync("HEAD").toString();
  } catch (_) {
    return "unknown";
  }
};
