const inquirer = require("inquirer");
const connection = require('./connection')

const newDepartment =
    'INSERT INTO department (name) VALUES (?)';

// function to add a department
function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "dept_new",
            message: "Write the name of the department you would like to add"
        }
    ])
    
    .then((answer) => {
        connection.query(newDepartment, [answer.dept_new], (err, res) => {
            if (err) throw err;
            console.log("A new department titled " + "'" + answer.dept_new + "'" + " is added to department table.");
            // runTasks();
        });
    });
};

module.exports = addDepartment;
