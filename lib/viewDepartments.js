require("console.table")

const db = require("./db");

// function to view all departments
function viewDepartments() {
    allDepartments()
    .then(([rows]) => {
        let departments = rows;
        console.table(departments);
    })
    .then(() => runTasks());
};

// allDepartments() {
//     return this.connection.promise().query(
//         "SELECT department.id, department.name FROM .....;"
//     )
// };

module.exports = viewDepartments;