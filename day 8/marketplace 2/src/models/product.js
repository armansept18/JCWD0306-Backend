'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
 class Product extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
   // define association here
   Product.belongsTo(models.User, {
    as: 'user',
    foreignKey: 'userid'
   });
  }
 }
 Product.init(
  {
   url: DataTypes.TEXT('LONG'),
   product_name: DataTypes.STRING,
   price: DataTypes.INTEGER,
   desc: DataTypes.STRING,
   stock: DataTypes.INTEGER,
   color: DataTypes.STRING,
   userid: DataTypes.INTEGER
  },
  {
   sequelize,
   modelName: 'Product',
   paranoid: true
  }
 );
 return Product;
};
