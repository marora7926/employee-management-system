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

const Roles = () => {
    connection.query('SELECT * FROM roles', (err, res) => {
      if (err) throw err;
      console.table(res);
    });
  }
  
  const Employees = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
      if (err) throw err;
      console.table(res);
    });
  }
  
  module.exports = { Departments, Roles, Employees};