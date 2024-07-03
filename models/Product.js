// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // Supports prices up to 99999999.99
      allowNull: false,
      validate: {
        isDecimal: true, // Validates that the value is a decimal
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10, // Default amount of stock
      validate: {
        isNumeric: true, // Validates that the value is numeric
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category', // This is a reference to another model
        key: 'id', // This is the column name of the referenced model
      }
    }
  },
  {
    sequelize,
    timestamps: false, // No timestamps are created automatically
    freezeTableName: true, // the table's name will NOT be pluralized
    underscored: true, // underscores will be used instead of camel-casing (i.e. `user_id` not `userId`)
    modelName: 'product' // the name of the model
  }
);

module.exports = Product;
