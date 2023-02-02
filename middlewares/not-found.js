const NotFoundMiddleware = (req, res, next) => {
  res.status(404).json({ msg: "Not Found", success: false });
};
module.exports = NotFoundMiddleware;
