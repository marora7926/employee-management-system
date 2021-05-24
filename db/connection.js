// required dependencies
const mysql = require('mysql');
const logoArt = require('asciiart-logo')
require('dotenv').config()

// Connecting via js 
const connection = mysql.createConnection({
  host: process.env.DB_HOST, //host name
  port: process.env.DB_PORT, // port number
  user: process.env.DB_USER, // user name from mysql workbench
  password: process.env.DB_PASSWORD, // password for mysql workbench
  database: process.env.DB_NAME, //database name
});

module.exports = connection;