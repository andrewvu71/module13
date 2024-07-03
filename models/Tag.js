const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    // Define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tag_name: {
      type: DataTypes.STRING,
      allowNull: true  // Allowing null values is optional and depends on your application's requirements
    }
  },
  {
    sequelize,
    timestamps: false,  // No timestamps are necessary unless you specifically need them for tag entries
    freezeTableName: true,  // Prevents Sequelize from renaming the table
    underscored: true,  // Uses underscores instead of camel-casing (i.e., `tag_name` not `tagName`)
    modelName: 'tag'  // This is the name used to identify the model in Sequelize queries
  }
);

module.exports = Tag;
