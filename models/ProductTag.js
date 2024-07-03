const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // Define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product', // Points to table name
        key: 'id', // Points to column name in the table
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tag', // Points to table name
        key: 'id', // Points to column name in the table
      }
    }
  },
  {
    sequelize,
    timestamps: false, // No need for timestamps in a junction table
    freezeTableName: true, // Prevents Sequelize from pluralizing the table name
    underscored: true, // Uses underscores instead of camel-casing
    modelName: 'product_tag', // This is the name of the model
  }
);

module.exports = ProductTag;
