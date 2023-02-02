const jwt = require("jsonwebtoken");
const generateAuthToken = async (dataObj) => {
  const token = await jwt.sign(dataObj, process.env.JWT_KEY);
  return token;
};
module.exports = generateAuthToken;
