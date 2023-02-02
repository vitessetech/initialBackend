const { CustomAPIError } = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res
      .status(err.statusCode)
      .json({ msg: err.message, status: err.statusCode });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    err: "Something went wrong!",
    message: err,
    status: StatusCodes.INTERNAL_SERVER_ERROR,
  });
};

module.exports = errorHandlerMiddleware;
