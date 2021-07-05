const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Muscles extends Model {}

Muscles.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_front: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    image_url_main: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url_secondary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'muscles',
  }
);


module.exports = Muscles;