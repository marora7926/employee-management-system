// required dependencies
const inquirer = require("inquirer");
const logoArt = require('asciiart-logo')
require("console.table")

// required files
const connection = require("./db/connection");
const {
    allDeptQuery, newDeptQuery, allEmpQuery, viewEmpByDeptQuery, viewMgrQuery,  newEmpQuery, 
    findRoleQuery, viewAllMgrQuery, allRoleQuery, newRoleQuery, updateEmpRole, db} =
    require('./db');

// after connection logo art using asciiart-logo
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`); //display the connection id
    // ASCII art logo
    console.log(
        logoArt({
            name: 'EMS*',
            font: 'ANSI Shadow',
            lineChars: 5,
            padding: 2,
            margin: 5,
            borderColor: 'grey',
            logoColor: 'bold-green',
            textColor: 'bold-yellow',
        })
        .left('*Employee Management System')
        .emptyLine() 
        .right('v1.0.0, dated 25.05.2021')
        .render()
    )
    runTasks();
});

// using inquirier for questions prompt and task to perform based on user selection. 
function runTasks() {
    inquirer.prompt({
        type: 'list',
        name: 'tasks',
        message: 'What would you like to do?',
        choices: [
            'View departments',
            'Add a department',
            'View employees',
            'View employees by departments',
            'View managers',
            'Add an employee',
            'View roles',
            'Add a role',     
            'Update employee role',
            'Exit',
        ],
    })
    .then((answer) => {
        // console.log(answer) //checking the response, if inquirer working
        switch (answer.tasks) {
            case 'View departments':
                viewDepartments();
            break;
            case 'Add a department':
                addDepartment();
            break;
            case 'View employees':
                viewEmployees();
            break;
            case 'Add an employee':
                addEmployee();
            break;
            case 'View employees by departments':
                viewEmpByDept();
            break;
            case 'View managers':
                viewMgr();
            break;
            case 'View roles':
                viewRoles();
            break;
            case 'Add a role':
                addRole();
            break;
            case 'Update employee role':
                updateEmployeeRole();
            break;
            default: 'Exit'
                console.log("Have a good day!")    
                connection.end();
                process.exit();
        }
    });
};

// VIEW ALL DEPARTMENTS
// View all departments function to present a console table 
function viewDepartments () {
    connection.query(allDeptQuery, (err, res) => {
        if (err) throw err;
        console.log('Showing all departments......\n');
        console.table(res);
        runTasks();
    })
};

// ADD A DEPARTMENT
// add a department function 
function addDepartment() {
    inquirer.prompt([
        {
        type: "input",
        name: "dept_new",
        message: "Write the name of the department you would like to add"
        }
    ])
    .then((answer) => {
        connection.query(newDeptQuery, [answer.dept_new], (err, res) => {
            if (err) throw err;
            console.log("A new department titled " + "'" + answer.dept_new + "'" + " is added to department table.");
            runTasks();
        });
    });
};

// VIEW ALL EMPLOYEES
// View all employees function to present a console table 
function viewEmployees () {
    connection.query(allEmpQuery, (err, res) => {
        if (err) throw err;
        console.log('Showing all employees........\n');
        console.table(res);
        runTasks();
    })
};

// VIEW ALL EMPLOYEES BY DEPARTMENTS
// View all employees by department function to present a console table
function viewEmpByDept () {
    connection.query(viewEmpByDeptQuery, (err, res) => {
        if (err) throw err;
        console.log('Showing all employees by department......\n');
        console.table(res);
        runTasks();
    })
};

// VIEW ALL MANAGER
// View all employees by manager function to present a console table
function viewMgr () {
    connection.query(viewMgrQuery, (err, res) => {
        if (err) throw err;
        console.log('Displaying all managers......\n');
        console.table(res);
        runTasks();
    })
};

// ADD AN EMPLOYEE
async function addEmployee() {
    const roles = await db.findAllRoles();
    console.log(roles);
    const employees = await db.findAllEmployees();

    const roleChoices = roles.map(({ r_id, title }) => ({
        name: title,
        value: r_id
      }));

    const managerChoices = employees.map(({ e_id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: e_id
    }));

    managerChoices.unshift({ name: "None", value: null });
  
      inquirer.prompt([
      {
        name: "first_name",
        message: "Write the new employee first name"
      },
      {
        name: "last_name",
        message: "Write the new employee last name"
      },
      {
          type:"list",
          name: "r_id",
          message: "please choose from the following roles",
          choices: roleChoices
      },
      {
        type:"list",
        name: "manager_id",
        message: "which manager you would like assign this role to",
        choices: managerChoices
    }
    ])
    .then(async employee => {
        await db.createEmployee(employee);

        console.log(
          `SUCESSFULLY Added ${employee.first_name} ${employee.last_name} to the employee management system`
        );
        runTasks();
    });
}
   
// VIEW ALL ROLES
// View all roles function to present a console table 
function viewRoles () {
    connection.query(allRoleQuery, (err, res) => {
        if (err) throw err;
        console.log('Showing all roles........\n');
        console.table(res);
        runTasks();
    });
};

// ADD A ROLE
// Add a role function
    async function addRole() {
    const departments = await db.findAllDepartments();
    console.log(departments);
    const deptChoices = departments.map(({ Dept_ID, Departments }) => ({ 
        value: Dept_ID,
        name: Departments }));
    inquirer.prompt([
        {
            type: "input",
            name: "new_title",
            message: "Write the name of the new role"
        },
        {
            type: "input",
            name: "new_salary",
            message: "Write the salary of this new role"
        },
        {
            type: "list",
            name: "new_department",
            message: "Assign a department to this new role",
            choices: deptChoices
        },
    ])
    .then((answer) => {
        connection.query(newRoleQuery, [answer.new_title, answer.new_salary, answer.new_department], (err, res) => {
            if (err) throw err;
            console.log("A new role (" + answer.new_title + ") has been created");
            runTasks();
        });
    });
};

// UPDATE EMPLOYEE ROLE
// function to update a role
async function updateEmployeeRole(){
    const roles = await db.findAllRoles();
    console.log(roles);
    const employees = await db.findAllEmployees();

    const roleChoices = roles.map(({ r_id, title }) => ({
        name: title,
        value: r_id
      }));

    const employeeChoices = employees.map(({ e_id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: e_id
    }));

    inquirer.prompt([  
        {
        type: "list",
        name: "updateEmployee",
        message: "Which employee are you updating?",
        choices: employeeChoices
        },  
        {
        type: "list",
        name: "updateRole",
        message: "What is the employee's new role?", 
        choices: roleChoices
        }, 
    ])
    .then((answer) => {
        console.log(answer, updateEmpRole);
        connection.query(updateEmpRole, [answer.updateRole, answer.updateEmployee], (err, res) => {
            if (err) throw err;
            console.log("Role of Employee with id '" + answer.updateEmployee+ "' is updated in the system.");
            runTasks();
        });
    });
}