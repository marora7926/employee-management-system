require("console.table")

// function to view all employees
function viewEmployees() {
    db.Employees()
        .then(([rows]) => {
            let employees = rows;
            console.table(employees);
        })
};

module.exports = viewEmployees;