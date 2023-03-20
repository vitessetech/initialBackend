const { Sequelize } = require("sequelize");

const {DB, DB_ADMIN, DB_PASSWORD} = process.env;

const sequelize = new Sequelize(DB, DB_ADMIN, DB_PASSWORD, {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
