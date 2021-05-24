const connection = require('./connection')
require("console.table")

const allDepartmentsQuery =
    `SELECT department.d_id AS "Dept_ID",
    department.name AS "Departments"
    FROM department`;

function viewDepartments () {
    connection.query(allDepartmentsQuery, (err, res) => {
        if (err) throw err;
        console.log('Showing all departments......\n');
        console.table(res);
    })
    // runTasks();
};

module.exports = viewDepartments;