const { Sequelize } = require("sequelize");
const sequelize = require("../utils/database");
const Role = require("../models/role");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  role_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Role,
      key: "id",
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pl_actual: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  pl_budget: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  revenue_actual: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  revenue_budget: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  str_report: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  daily_revenue: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  monthly_revenue: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  // isAdmin: {
  //   type: Sequelize.BOOLEAN,
  //   defaultValue: false,
  // },
});

User.belongsTo(Role, { foreignKey: "id", constraints: false });
module.exports = User;
