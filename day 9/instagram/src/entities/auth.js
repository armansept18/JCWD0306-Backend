const db = require('../models');
const Entity = require('./entity');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
class Auth extends Entity {
 constructor(model) {
  super(model);
 }

 login(req, res) {
  const { user, password } = req.body;
  db.User.findOne({
   where: {
    [db.Sequelize.Op.or]: {
     email: { [db.Sequelize.Op.like]: `%${user}%` },
     username: { [db.Sequelize.Op.like]: `%${user}%` },
     phone_number: { [db.Sequelize.Op.like]: `%${user}%` }
    }
   }
   //select * from users where email like '%%' or username like '%%' or phone_number like '%%'
  })
   .then(async (result) => {
    console.log(
     moment(result.dataValues.suspended_date).diff(moment().format()),
     'this'
    );
    if (moment(result.dataValues.suspended_date).diff(moment().format()) > 0)
     throw new Error(
      `your account has been suspended for ${
       moment(result.dataValues.suspended_date).diff(moment().format()) / 1000
      } sec`
     );

    const isValid = await bcrypt.compare(password, result.dataValues.password);
    if (!isValid) {
     if (result.dataValues.login_attempt >= 2)
      db.User.update(
       {
        login_attempt: 0,
        suspended_date: moment().add(moment.duration(30, 'second')).format()
       },
       {
        where: {
         id: result.dataValues.id
        }
       }
      );
     else
      db.User.update(
       { login_attempt: result.dataValues.login_attempt + 1 },
       {
        where: {
         id: result.dataValues.id
        }
       }
      );
     throw new Error('wrong password');
    }
    delete result.dataValues.password;

    const payload = {
     id: result.dataValues.id,
     is_verified: result.dataValues.is_verified
    };

    const token = jwt.sign(payload, process.env.jwt_secret, {
     expiresIn: '1h'
    });

    return res.send({ token, user: result });
   })
   .catch((err) => {
    res.status(500).send(err?.message);
   });
 }
 async register(req, res) {
  try {
   const isUserExist = await db.User.findOne({
    where: {
     [db.Sequelize.Op.or]: {
      email: { [db.Sequelize.Op.like]: `%${req.body.email}` },
      username: { [db.Sequelize.Op.like]: `%${req.body.username}` },
      phone_number: { [db.Sequelize.Op.like]: `%${req.body.phone_number}` }
     }
    }
   });

   if (isUserExist?.dataValues?.id) {
    throw new Error('user sudah terdaftar');
   }
   req.body.password = await bcrypt.hash(req.body.password, 10);

   this.create(req, res);
  } catch (err) {
   res.status(500).send(err?.message);
  }
 }
 async keepLogin(req, res) {
  try {
   const { token } = req.params;
   console.log(token);
   const data = jwt.verify(token, process.env.jwt_secret);
   console.log(data);
   if (!data.id) throw new Error('invalid token');

   console.log(data);

   const payload = await db.User.findOne({
    where: {
     id: data.id
    }
   });
   delete payload.dataValues.password;

   const newToken = jwt.sign(
    { id: data.id, is_verified: payload.dataValues.is_verified },
    process.env.jwt_secret,
    {
     expiresIn: '1h'
    }
   );

   return res.send({ token: newToken, user: payload });
  } catch (err) {
   res.status(500).send(err?.message);
  }
 }
 async editProfile(req, res) {
  try {
   console.log(req.body);
   const isUserExist = await db.User.findOne({
    where: {
     [db.Sequelize.Op.or]: {
      username: req.body.username
     }
    }
   });

   if (isUserExist?.dataValues?.id != req.params.id && isUserExist) {
    throw new Error('username sudah terdaftar');
   }
   this.updateById(req, res);
  } catch (err) {
   res.status(500).send(err?.message);
  }
 }
}

module.exports = Auth;
