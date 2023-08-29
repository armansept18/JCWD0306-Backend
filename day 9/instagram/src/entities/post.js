const db = require('../models');
const Entity = require('./entity');
const { Op } = db.Sequelize;
class Post extends Entity {
 constructor(model) {
  super(model);
 }
}

module.exports = Post;
