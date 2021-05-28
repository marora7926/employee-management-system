const connection = require('./connection')
require("console.table")

const allEmployeesQuery =
    `SELECT employee.e_id AS "Employee_ID",
    employee.first_name AS "F_Name",
    employee.last_name AS "L_Name",
    employee.r_id AS "Role_ID",
    employee.manager_id as "Manager_ID",
    FROM employee`;

function viewEmployees () {
    connection.query(allEmployeesQuery, (err, res) => {
        if (err) throw err;
        console.log('Showing all employees........\n');
        console.table(res);
    })
};

module.exports = viewEmployees;