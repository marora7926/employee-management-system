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
                runTasks();
            break;
            case 'Add a role':
                addRole();
                runTasks();
            break;
            case 'Add an employee':
                addEmployee();
                runTasks();
            break;
            case 'View departments':
                viewDepartments();
                runTasks();
            break;
            case 'View roles':
                viewRoles();
                runTasks();
            break;
            case 'View employees':
                viewEmployees();
                runTasks();
            break;
            case 'Update employee role':
                updateEmployee();
                runTasks();
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

