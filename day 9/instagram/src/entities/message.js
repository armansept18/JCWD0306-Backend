const db = require('../models');
const Entity = require('./entity');
class Message extends Entity {
 constructor(model) {
  super(model);
 }
 getMessagesByRecevier(req, res) {
  const { receiver, sender } = req.query;
  db.Message.findAll({
   include: [
    {
     model: db.User,
     as: 'user_senders'
    },
    {
     model: db.User,
     as: 'user_recievers'
    }
   ],
   where: {
    user_sender_id: sender,
    user_reciever_id: receiver
   }
  })
   .then((result) => res.send(result))
   .catch((err) => res.status(500).send(err?.message));
 }
}

module.exports = Message;
