// function to add a department
function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "department_name",
            message: "Write the name of the department you would like to add"
        }
    ])
        .then(res => {
            let departmentName = res;
            db.addDepartment(name)
            .then(() => 
                console.log(`Added ${departmentName.name} to the database`)
            )
        })
}

module.exports = addDepartment;
