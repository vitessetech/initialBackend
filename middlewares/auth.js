const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const VerifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json("Please Provide Authentication token");
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    var user = await User.findOne({ where: { email: decoded.email } });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ Error: "User Not Found" });
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(StatusCodes.FORBIDDEN).json({ error: e.message });
  }
};

module.exports = { VerifyToken };
