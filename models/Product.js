// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columnsid
    id: {
      // use the special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      // this is the equivalent of SQL's `NOT NULL` option
      allowNull: false,
      // instruct that this is the Primary Key
      primaryKey: true,
      // turn on auto increment
      autoIncrement: true
    },

    // define a product_name column
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    // define a price column
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      // validate that the value is a decimal
      validate: {
        isDecimal: true
      }
    },

    // define a stock column
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // set default value of 10
      defaultValue: 10,
      // validate that the value is numeric
      validate: {
        isNumeric: true
      }
    },

    // define a category_id column
    category_id: {
      type: DataTypes.INTEGER,
      // reference the category model's id
      references: {
        model: 'category',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
