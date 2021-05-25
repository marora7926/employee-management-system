// required dependencies
const inquirer = require("inquirer");
const logoArt = require('asciiart-logo')

// required files
const connection = require("./utils/connection");
const viewDepartments = require("./utils/viewDepartments")
const addDepartment = require("./utils/addDepartment")
const viewEmployees = require("./utils/viewEmployees")
// const addEmployee = require("./utils/addEmployee")
const viewRoles = require("./utils/viewRoles")
// const addRole = require("./utils/addRole")
// const updateEmployeeRole = require("./utils/updateEmployeeRole")

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
            'View departments',
            'Add a department',
            'View employees',
            'View employees by departments',
            'View employees by managers',
            'Add an employee',
            'View roles',
            'Add a role',     
            'Update employee role',
            'Exit',
        ],
    })
    .then((answer) => {
        // console.log(answer) //checking the response, if inquirer working
        switch (answer.tasks) {
            case 'View departments':
                viewDepartments();
                runTasks();
            break;
            case 'Add a department':
                addDepartment();
                runTasks();
            break;
            case 'View employees':
                viewEmployees();
                runTasks();
            break;
            case 'Add an employee':
                addEmployee();
                runTasks();
            break;
            case 'view employees by departments':
                viewEmpByDept();
                runTasks();
            break;
            case 'view employees by roles':
                viewEmpByRole();
                runTasks();
            break;
            case 'View roles':
                viewRoles();
                runTasks();
            break;
            case 'Add a role':
                addRole();
                runTasks();
            break;
            case 'Update employee role':
                updateEmployeeRole();
                runTasks();
            break;
            default: 'Exit'
                connection.end();
                process.exit();
        }
    });
};