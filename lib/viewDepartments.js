require("console.table")

// function to view all departments
function viewDepartments() {
    allDepartments()
    .then(([rows]) => {
        let departments = rows;
        console.table(departments);
    })
    .then(() => runTasks());
};

function allDepartments() {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
      });
    }

module.exports = viewDepartments;