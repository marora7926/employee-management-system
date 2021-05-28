const inquirer = require("inquirer");
const connection = require('./connection')

const newEmpQuery =
    'INSERT INTO employee (first_name, last_name, r_id, manager_id) VALUES (?,?,?,?)';

// function to add an employee
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "new_firstName",
            message: "Write the new employee first name"
        },
        {
            type: "input",
            name: "new_lastName",
            message: "Write the new employee last name"
        },
        {
            type: "list",
            name: "role",
            message: "Assign a role to this employee",
            Choices: //to write this
        },
        {
            type: "list",
            name: "manager",
            message: "Assign a manager to this employee",
            Choices: //to write this
        }
    ])
    .then((answer) => {
        connection.query(newEmpQuery, [answer.new_firstName, answer.new_lastName, answer.role, answer.manager], (err, res) => {
            if (err) throw err;
            console.log("Welcome, " + answer.new_firstName + answer.new_lastName + " to the organisation");
        });
    });
};

module.exports = addEmployee;