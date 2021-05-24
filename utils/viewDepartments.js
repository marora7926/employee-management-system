const connection = require('./connection')
require("console.table")

const allDepartmentsQuery =
    `SELECT department.d_id AS "Dept_ID",
    department.name AS "Departments"
    FROM department`;

async function viewDepartments () {
    connection.query(allDepartmentsQuery, (err, res) => {
        if (err) throw err;
        console.table(res);
    })
    // runTasks();
};

module.exports = viewDepartments;