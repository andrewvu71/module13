const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // Define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, // Automatically increment the ID for new entries
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false, // Disabling timestamps if you don't need createdAt and updatedAt
    freezeTableName: true, // Prevents Sequelize from renaming the table
    underscored: true, // Uses underscores instead of camel casing (e.g., `category_name` instead of `categoryName`)
    modelName: 'category' // This is the name used to identify the model in Sequelize queries
  }
);

module.exports = Category;
