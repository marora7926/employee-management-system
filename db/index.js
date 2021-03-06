const connection = require("./connection");
const util = require('util');
const query = util.promisify(connection.query).bind(connection);

    // View all departments queries 
    const allDeptQuery =
    `SELECT department.d_id AS "Dept_ID",
    department.name AS "Departments"
    FROM department`;

    // Add a department queries 
    const newDeptQuery =
    'INSERT INTO department (name) VALUES (?)';

    // View all employees queries 
    const allEmpQuery =
        `SELECT employee.e_id AS "Employee_ID",
        employee.first_name AS "F_Name",
        employee.last_name AS "L_Name",
        employee.r_id AS "Role_ID",
        employee.manager_id as "Manager_ID"
        FROM employee`;

    // View all employees by department queries 
    const viewEmpByDeptQuery =
    `SELECT employee.e_id AS "ID", 
    CONCAT (employee.first_name, " ", employee.last_name) AS "Employee Name",
    role.title AS "Position",
    role.salary AS "Salary", 
    department.name AS "Department"
    FROM department, role, employee
    WHERE employee.r_id = role.r_id AND department.d_id = role.d_id`;


    // View all manager queries 
    const viewMgrQuery =
    `SELECT employee.e_id AS "ID", 
    CONCAT (employee.first_name, " ", employee.last_name) AS "Manager Name",
    role.title AS "Position",
    department.name AS "Department",
    role.salary AS "Salary"
    FROM department, role, employee
    WHERE employee.r_id = role.r_id 
    AND department.d_id = role.d_id
    AND employee.manager_id IS NULL`;

    // Add an employee queries 
    const newEmpQuery =
    'INSERT INTO employee (first_name, last_name, title, manager_id) VALUES (?,?,?,?)';

    // Role title query for creating an array for function "add an employree" 
    const findRoleQuery =
    `SELECT title FROM role`;

    // Manager name query for creating an array for function "add an employree"
    const viewAllMgrQuery =
    `SELECT employee.first_name, AS "Manager_F_Name",
    employee.last_name, AS "Manager_L_Name"
    FROM employee
    WHERE employee.manager_id IS NULL`;

    // View all roles queries 
    const allRoleQuery =
    `SELECT role.r_id AS "Role_ID",
    role.title AS "Title",
    role.salary AS "Salary",
    role.d_id AS "Dept_ID"
    FROM role`;

    // Add a role queries 
    const newRoleQuery =
    'INSERT INTO role (title, salary, d_id) VALUES (?,?,?)';

    // update a employee role queries
    const updateEmpRole =
    'UPDATE employee SET r_id = ? WHERE e_id = ?';

class DB {
    // Keeping a reference to the connection on the class in case we need it later
    constructor(connection) {
        this.connection = connection;
    }
    
    findAllRoles() {
        return query (
            `SELECT 
                role.r_id,
                role.title,
                department.name AS department, 
                role.salary FROM role LEFT JOIN department on role.d_id = department.d_id;`);
    };

    findAllDepartments() {
        return query (allDeptQuery);
    };

    // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
    findAllEmployees() {
        return query (
            `SELECT 
                employee.e_id, 
                employee.first_name, 
                employee.last_name, 
                role.title, 
                department.name AS department, role.salary, 
                CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
                FROM employee LEFT JOIN role on employee.r_id = role.r_id 
                LEFT JOIN department on role.d_id = department.d_id 
                LEFT JOIN employee manager on manager.e_id = employee.manager_id;`
        );
    };

    // Create a new employee
    createEmployee(employee) {
        console.log("INSERT INTO employee SET ?", employee)
        return query (
            "INSERT INTO employee SET ?", employee
        );
    }
}

module.exports = {
    
    db:new DB(connection),
    allDeptQuery,
    newDeptQuery,
    allEmpQuery,
    viewEmpByDeptQuery,
    viewMgrQuery,
    newEmpQuery,
    findRoleQuery,
    viewAllMgrQuery,
    allRoleQuery,
    newRoleQuery,
    updateEmpRole
};
