const { Sequelize } = require("sequelize");
const sequelize = require("../utils/database");
const User = require("../models/user");

const Role = sequelize.define("role", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  role_name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  // permissions: {
  //   type: Sequelize.ARRAY,
  //   allowNull: true,
  // },
});

// Role.hasMany(User, { foreignKey: "role_id", constraints: false });
module.exports = Role;
