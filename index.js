// required dependencies
const inquirer = require("inquirer");
const logoArt = require('asciiart-logo')

// required files
const connection = require("./db/connection");
// const addDepartment = require("./lib/addDepartment");
// const addEmployee = require("./lib/addEmployee");
// const addRole = require("./lib/addRole");
// const updateEmployeeRole = require("./lib/updateEmployeeRole");
// const viewDepartments = require("./lib/viewDepartments");
// const viewRoles = require("./lib/viewRoles");
// const viewEmployees = require("./lib/viewEmployees");

// after connection logo art using asciiart-logo
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`); //display the connection id
    // ASCII art logo
    console.log(
        logoArt({
            name: 'EMS*',
            font: 'ANSI Shadow',
            lineChars: 5,
            padding: 5,
            margin: 5,
            borderColor: 'grey',
            logoColor: 'bold-green',
            textColor: 'bold-yellow',
        })
        .emptyLine() 
        .right('*Employee Management System')
        .render()
    )
    runTasks();
});

// using inquirier for questions prompt and task to perform based on user selection. 
function runTasks() {
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
            'Exit',
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
            default: 'Exit'
                connection.end();
                process.exit();
        }
    });
};