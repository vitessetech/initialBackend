const multer = require("multer");
const moment = require('moment')
const fileUpload = (fieldName,path,extensions = ["txt"]) => {
const date = moment(new Date()).format('DD-MM-YY')
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./assets/media/" + path);
    },
    filename: function (req, file, callback) {
      callback(
        null,
        file.fieldname +
          "-" +
          date +
          "." +
          file.originalname.split(".")[file.originalname.split(".").length - 1]
      );
    },
  });


var fileFilter = (req, file, callback) => {
    if (
      extensions.indexOf(
        file.originalname.split(".")[file.originalname.split(".").length - 1]
      ) === -1
    ) {
      req.fileValidationError = "Wrong extension type!";
      return callback(null, false);
    }
    callback(null, true);
  };
  var upload = multer({ storage: storage, fileFilter: fileFilter }).single(
    fieldName
  );
    return upload
}

module.exports = fileUpload