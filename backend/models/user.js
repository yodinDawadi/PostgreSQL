const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const User = sequelize.define("User", {
  uid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3,12]
    },
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
        isEmail: true,
    }
  },
  password: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: false,
    validate: {
        len: [6,16],
    }
  }
});

module.exports = User;