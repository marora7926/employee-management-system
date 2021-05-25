const inquirer = require("inquirer");
const connection = require('./connection')

const updateEmpRole =
    'UPDATE employee SET r_id = ? WHERE e_id = ?';

// function to update a role
function updateEmployeeRole(){
    inquirer.prompt([  
        {
        type: "list",
        name: "updateEmployee",
        message: "Which employee are you updating?",
        choices: //to write this
        },  
        {
        type: "list",
        name: "updateRole",
        message: "What is the employee's new role?", 
        choices: //to write this
        }, 
    ])
    .then((answer) => {
        connection.query(updateEmpRole, [answer.updateEmployee, answer.updateRole], (err, res) => {
            if (err) throw err;
            console.log("Role of Employee with id '" + answer.updateEmployee+ "' is updated in the system.");
            runTasks(); 
        });
    });
};

module.exports = updateEmployeeRole;