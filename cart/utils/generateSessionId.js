const { v4: uuid } = require("uuid");

const generateSessionId = () => {
  return uuid();
};


module.exports = generateSessionId;