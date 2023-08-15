const moment = require('moment');
const fs = require('fs');
const writelog = (req, res, next) => {
 const msg = moment().format('YYYY-MM-DD HH:mm:ss');

 fs.appendFile(__dirname + '/../log/log.txt', msg + '\n', (err) =>
  console.log(err)
 );

 next();
};

module.exports = writelog;
