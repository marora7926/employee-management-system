const connection = require('./connection')
require("console.table")

const allRolesQuery =
    `SELECT role.r_id AS "Role_ID",
    role.title AS "Title",
    role.salary AS "Salary",
    role.d_id AS "Dept_ID"
    FROM role`;

async function viewRoles () {
    connection.query(allRolesQuery, (err, res) => {
        if (err) throw err;
        console.table(res);
    })
    // runTasks();
};

module.exports = viewRoles;