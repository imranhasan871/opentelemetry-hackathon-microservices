const bcrypt = require("bcryptjs");

/**
 * A utility class for hashing and verifying passwords using bcrypt.
 *
 * @class Password
 */
class Password {
  static hash(password) {
    return bcrypt.hash(password, 10);
  }

  static verify(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = Password;