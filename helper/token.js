const jwt = require("jsonwebtoken");

exports.generateToken = async (payload, expired) => {
  return await jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: expired,
  });
};
