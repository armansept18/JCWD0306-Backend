const db = require('../models');
const Entity = require('./entity');
class Post extends Entity {
 constructor(model) {
  super(model);
 }

 getPosts(req, res) {
  const limit = 2;
  const page = req.query.page;
  db.Post.findAll({
   include: { model: db.User, as: 'user' },
   order: [['createdAt', 'DESC']],
   offset: (page - 1) * limit,
   limit: limit
  })
   .then((result) => res.send(result))
   .catch((err) => res.status(500).send(err?.message));
 }
 getPostsByUserId(req, res) {
  db.Post.findAll({
   include: { model: db.User, as: 'user' },
   where: {
    user_id: req.params.userid
   },
   order: [['createdAt', 'DESC']]
  })
   .then((result) => res.send(result))
   .catch((err) => res.status(500).send(err?.message));
 }
 getPostByFilter(req, res) {
  db.Post.findAll({
   include: {
    model: db.User,
    as: 'user'
   },
   where: {
    [db.Sequelize.Op.or]: {
     caption: { [db.Sequelize.Op.like]: `%${req.query.search}%` },
     '$user.username$': { [db.Sequelize.Op.like]: `%${req.query.search}%` }
    }
   }
  })
   .then((result) => res.send(result))
   .catch((err) => res.status(500).send(err?.message));
 }
}

module.exports = Post;
