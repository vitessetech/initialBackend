const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("bi", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
