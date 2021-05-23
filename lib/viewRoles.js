require("console.table")

// function to view all roles
function viewRoles() {
    db.Roles()
        .then(([rows]) => {
            let roles = rows;
            console.table(roles);
        })
};

module.exports = viewRoles;