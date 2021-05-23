const mysql = require('mysql');
const inquirer = require("inquirer");

const addDepartment = require("./lib/addDepartment");
const addEmployee = require("./lib/addEmployee");
const addRole = require("./lib/addRole");
const updateEmployeeRole = require("./lib/updateEmployeeRole");
const viewDepartments = require("./lib/viewDepartments");
const viewRoles = require("./lib/viewRoles");
const viewEmployees = require("./lib/viewEmployees");

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

const runTasks = () => {
    inquirer.prompt({
        type: 'list',
        name: 'tasks',
        message: 'What would you like to do?',
        choices: [
        'Add a department',
        'Add a role',
        'Add an employee',
        'View departments',
        'View roles',
        'View employees',
        'Update employee role',
        'exit',
        ],
    })
    .then((answer) => {
        switch (answer.task) {
            case 'Add a department':
                addDepartment();
            break;
            case 'Add a role':
                addRole();
            break;
            case 'Add an employee':
                addEmployee();
            break;
            case 'View departments':
                viewDepartments();
            break;
            case 'View roles':
                viewRoles();
            break;
            case 'View employees':
                viewEmployees();
            break;
            case 'Update employee role':
                updateEmployeeRole();
            break;
            case 'Exit':
                connection.end();
            break;
            default:
                console.log(`Invalid action: ${answer.task}`);
            break;
        }
    });
};