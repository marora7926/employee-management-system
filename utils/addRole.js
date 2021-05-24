const inquirer = require("inquirer");
const connection = require('./connection')

// function to add a role
const newRole =
    'INSERT INTO role (title, salary, d_id) VALUES (?,?,?)';

// function to add an employee
function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "new_title",
            message: "Write the name of the new role"
        },
        {
            type: "input",
            name: "new_salary",
            message: "Write the salary of this new role"
        },
        {
            type: "list",
            name: "new_department",
            message: "Assign a department to this new role",
            Choices: //to write this
        },
    ])
    .then((answer) => {
        connection.query(newRole, [answer.new_title, answer.new_salary, answer.new_department], (err, res) => {
            if (err) throw err;
            console.log("A new role (" + answer.new_firstName + answer.new_lastName + ") has been created");
            // runTasks();
        });
    });
};

module.exports = addRole;