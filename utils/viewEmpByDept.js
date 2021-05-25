const connection = require('./connection')
require("console.table")

// function to view employee by department
const viewEmpByDeptQuery =
    `SELECT employee.e_id AS "ID", 
    CONCAT (employee.first_name, " ", employee.last_name) AS "Employee Name",
    role.title AS "Position",
    role.salary AS "Salary", 
    department.name AS "Department",
    FROM deparmtent role employee,
    WHERE employee.r_id = role.r_id AND department.d_id = role.d_id`;

function viewEmpByDept () {
    connection.query(viewEmpByDeptQuery, (err, res) => {
        if (err) throw err;
        console.log('Showing all employees by department......\n');
        console.table(res);
    })
};

module.exports = viewEmpByDept;