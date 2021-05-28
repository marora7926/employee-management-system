const connection = require('./connection');

function deptArray (choices) {
    const deptArrayQuery = `SELECT * from department`;
    connection.query(deptArrayQuery, (err, res) => {
        if (err) throw err;
        const deptChoices = res.map(department => {
            return {value: department.d_id, name: department.name}
        })
        choices(deptChoices)
    });
};

function EmpArray (choices) {
    const EmpArrayQuery = `SELECT * from employee`;
    connection.query(EmpArrayQuery, (err, res) => {
        if (err) throw err;
        const empChoices = res.map(employee => { 
            return {value: employee.e_id, name: `${employee.first_name} ${employee.last_name}` }
        })
        choices(empChoices)
    });
};

const roleArray = (choices) => {
    const roleArrayQuery = `SELECT * from role`;
    connection.query(roleArrayQuery, (err, res) => {
        if (err) throw err;
        const roleChoices = res.map(role => { 
            return {value: role.r_id, name: role.title }
        })
        choices(roleChoices)
    });
};

module.exports = {deptArray, EmpArray, roleArray};