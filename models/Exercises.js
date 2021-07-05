const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Exercises extends Model {}

Exercises.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exercise_base: {
      type: DataTypes.INTEGER,

      allowNull: false,

    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    creation_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
    muscles: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    muscles_secondary: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    equipment: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    language: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    license: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    license_author: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    variations: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    gif_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'exercises',
  }
);

module.exports = Exercises;