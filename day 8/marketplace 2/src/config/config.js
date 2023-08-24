require('dotenv').config();

module.exports = {
 development: {
  username: process.env.MYSQL_username,
  password: process.env.MYSQL_password,
  database: process.env.MYSQL_database,
  host: process.env.MYSQL_host,
  dialect: process.env.MYSQL_dialect
 },
 test: {
  username: 'root',
  password: null,
  database: 'database_development',
  host: '127.0.0.1',
  dialect: 'mysql'
 },
 production: {
  username: 'root',
  password: null,
  database: 'database_development',
  host: '127.0.0.1',
  dialect: 'mysql'
 }
};
