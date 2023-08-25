'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
 class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
   // define association here
   this.hasMany(models.Product, {
    as: 'product',
    foreignKey: 'userid'
   });
  }
 }
 User.init(
  {
   email: {
    type: DataTypes.STRING,
    unique: true
   },
   fullname: DataTypes.STRING,
   password: DataTypes.STRING,
   gender: DataTypes.ENUM('male', 'female'),
   age: DataTypes.INTEGER
  },
  {
   sequelize,
   modelName: 'User'
  }
 );

 return User;
};
