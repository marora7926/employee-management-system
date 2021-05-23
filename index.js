const mysql = require('mysql');
const inquirer = require("inquirer");
require("dotenv")
require("console.table")

const addDepartment = require("./lib/addDepartment");
const addEmployee = require("./lib/addEmployee");
const addRole = require("./lib/addRole");
const updateEmployeeRole = require("./lib/updateEmployeeRole");
const viewDepartments = require("./lib/viewDepartments");
const viewRoles = require("./lib/viewRoles");
const viewEmployees = require("./lib/viewEmployees");

// Connecting via js 
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Yogindance@97762',
    database: 'employeeDB',
  });

// // Connecting via js 
// const connection = mysql.createConnection({
//   host: 'localhost',
//   port: 3306,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
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
            case 'Exit':
                connection.end();
            break;
            default:
                console.log(`Invalid action: ${answer.task}`);
            break;
        }
    });
};


// // function to add a department
// function addDepartment() {
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "department_name",
//             message: "Write the name of the department you would like to add"
//         }
//     ])
//         .then(res => {
//             let departmentName = res;
//             db.addDepartment(name)
//             .then(() => 
//                 console.log(`Added ${departmentName.name} to the database`)
//             )
//         })
// }

// // function to add an employee
// function addEmployee() {
// }

// // function to add a role
// function addRole() {
// }

// // function to view all departments
// function viewDepartments() {
//     db.Departments()
//     .then(([rows]) => {
//         let departments = rows;
//         console.table(departments);
//     })
// };

// // function to view all employees
// function viewEmployees() {
//     db.Employees()
//         .then(([rows]) => {
//             let employees = rows;
//             console.table(employees);
//         })
// };

// // function to view all roles
// function viewRoles() {
//     db.Roles()
//         .then(([rows]) => {
//             let roles = rows;
//             console.table(roles);
//         })
// };