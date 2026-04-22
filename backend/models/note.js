const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");
const User = require('../models/user')

const Note = sequelize.define("Note", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3,100],
      notEmpty: true,
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3,500],
      notEmpty: true,
    }
  },
  uid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "uid",
    },
  },
});
User.hasMany(Note, { foreignKey: 'uid' });
Note.belongsTo(User, { foreignKey: 'uid' });
module.exports = Note;
