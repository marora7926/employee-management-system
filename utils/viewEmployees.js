const connection = require('./connection')
require("console.table")

const allEmployeesQuery =
    `SELECT employee.e_id AS "Employee_ID",
    employee.first_name AS "F_Name",
    employee.last_name AS "L_Name",
    employee.r_id AS "Role_ID",
    employee.manager_id as "Manager_ID"
    FROM employee`;

async function viewEmployees () {
    connection.query(allEmployeesQuery, (err, res) => {
        if (err) throw err;
        console.table(res);
    })
    // runTasks();
};

module.exports = viewEmployees;