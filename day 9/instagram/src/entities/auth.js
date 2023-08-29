const db = require('../models');
const Entity = require('./entity');

class Auth extends Entity {
 constructor(model) {
  super(model);
 }

 login(req, res) {
  const { user, password } = req.body;
  db.User.findOne({
   where: {
    [db.Sequelize.Op.or]: {
     email: { [db.Sequelize.Op.like]: `%${user}` },
     username: { [db.Sequelize.Op.like]: `%${user}` },
     phone_number: { [db.Sequelize.Op.like]: `%${user}` }
    },
    password
   }
  })
   .then((result) => {
    console.log(result);
    delete result.dataValues.password;
    return res.send(result);
   })
   .catch((err) => {
    res.status(500).send(err?.message);
   });
 }
}

module.exports = Auth;
