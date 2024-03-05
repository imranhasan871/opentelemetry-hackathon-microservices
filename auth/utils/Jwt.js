const jwt = require("jsonwebtoken");
const config=require("../config/config")

/**
 * The Jwt class provides methods for signing, verifying, and decoding JSON Web Tokens (JWTs).
 *
 * @class Jwt
 */
class Jwt {
  static signAccessToken(
    payload,
    expiry = "360d",
    secret = config.jwt_access_secret
  ) {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }

  static verifyAccessToken(payload, secret = config.jwt_access_secret) {
    return jwt.verify(payload, secret);
  }

  static decodeAccessToken(payload) {
    return jwt.decode(payload);
  }

}

module.exports = Jwt;