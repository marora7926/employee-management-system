// required dependencies
const inquirer = require("inquirer");
const logoArt = require('asciiart-logo')
require("console.table")

// required files
const connection = require("./utils/connection");
const addDepartment = require("./utils/addDepartment")
const addEmployee = require("./utils/addEmployee")
const addRole = require("./utils/addRole")
const addRole = require("./utils/updateEmployeeRole")
const viewDepartments = require("./utils/viewDepartments")
const viewEmployees = require("./utils/viewEmployees")
const viewRoles = require("./utils/viewRoles")

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
            padding: 2,
            margin: 5,
            borderColor: 'grey',
            logoColor: 'bold-green',
            textColor: 'bold-yellow',
        })
        .left('*Employee Management System')
        .emptyLine() 
        .right('v1.0.0, dated 25.05.2021')
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
        // console.log(answer) //checking the response, if inquirer working
        switch (answer.tasks) {
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