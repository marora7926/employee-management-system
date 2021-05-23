require("console.table")

// function to view all departments
function viewDepartments() {
    db.Departments()
    .then(([rows]) => {
        let departments = rows;
        console.table(departments);
    })
};

module.exports = viewDepartments;