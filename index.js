const mysql = require('mysql');
const inquirer = require("inquirer");

// Connecting via js 
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
    if (err) throw err;
    runTasks();
  });
  

