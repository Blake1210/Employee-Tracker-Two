const db = require("../db/connection");
const { prompt} = require('inquirer');

const startSystem = () => {
    prompt([{
        type: "list",
        name: "toDo",
        message: "Welcome. What would you like to view?",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update employee role",
            "Quit"
        ],
    }
])
    .then(function (responses) {
        const nextQuestion = responses.toDo;
        switch(nextQuestion) {
            case "View all departments":
                viewDepartments();
              break;
            case "View all roles":
                viewRoles();
              break;
              case "View all employees":
                viewEmployees();
              break;
              case "Add a department":
                addDepartment();
              break;
              case "Add a role":
              addRoles();
              break;
              case "Add an employee":
              addEmployees();
              break;
              case "Update employee role":
              updateEmployee();
              break;
            case "Quit":
              process.quit();
              break;
              // code block
          }
        

    })
};

const viewDepartments = () => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        if (err) {
            throw err
        }
        console.log("\n");
        console.table(rows);
        return startSystem();
    });
};

const viewRoles = () => {
    const sql = `SELECT * FROM roles`;
        db.query(sql, (err, rows) => {
            if (err) {
                throw err
            }
            console.log("\n");
            console.table(rows);
            return startSystem();
        });
};

const viewEmployees = () => {
    const sql = `SELECT * FROM employees`;
    db.query(sql, (err, rows) => {
        if (err) {
        throw err
       }
        console.log("\n");
        console.table(rows);
        return startSystem();
  });
};

const addDepartment = () => {
    return prompt([
        {
            type: "input",
            name: "name",
            message: "What is this department called?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("please enter department name");
                    return false;
                };
            }
        }
    ])
    .then(response => {
        const sql = `INSERT INTO departments (department_name) VALUES (?)`
        const param = response.name;
        db.query(sql, param, (err) => {
            if (err) {
                throw err;
            }
            console.log("Added department");
            return viewDepartments();
        });
    });
};

const addRoles = () => {
    return prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of this role?",
            validate: nameInput => {
             if (nameInput) {
              return true;
             } else {
             console.log("Please enter a role name");
               return false;
               };
            }
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of this role?",
            validate: salaryInput => {
                if (isNaN(salaryInput)) {
                    console.log("Enter a salary");
                return false;
              } else {
                return true;
                };
            }
        }
    ])
    .then (response => {
        const param = [response.title, response.salary];
        const sql = `SELECT * FROM departments`;
        db.query(sql, (err, rows) => {
            if (err) {
                throw err;
              }
              const departments = rows.map(({name, id}) => ({name: name, value: id}));
              prompt([
                {
                    type: "list",
                    name: "department",
                    message: "What department is this job belong to?",
                    choices: departments
                }
              ])
              .then(departmentResponse => {
                const department = departmentResponse.department;
                param.push(department);
                const sql = `INSERT INTO roles (title, salary, department_id)
                VALUES (?, ?, ?)`;
                db.query(sql, param, (err) => {
                    if (err) {
                        throw err;
                      }
                      console.log("Role added!");
                      return viewRoles();
                });
              });
        });
    });
};

const addEmployee = () => {
    return prompt([
      {
        type: "input",
        name: "fistName",
        message: "What is the employee's first name?",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log("Enter a name");
                return false;
            };
        }
    },
    {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
        validate: nameInput => {
            if (nameInput) {
                return true;
              } else {
                console.log("Please enter a name");
                return false;
              };
        }
    }
    ])
    .then (response => {
        const param = [response.firstName, response.lastName];
        const sql = `SELECT * FROM roles`;
        db.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            const role = rows.map(({title, id}) => ({name: title, value: id}));
            prompt([
                {
                    type: "list",
                    name: "role",
                    message: "What is the role of this employee?",
                    choices: role
                }
            ])
            .then(roleResponse => {
                const role = roleResponse.role;
                param.push(role);
                const sql = `SELECT * FROM employees`;
                db.query(sql, (err, rows) => {
                    if (err) {
                        throw err;
                    }
                    const manager = rows.map(({first_name, last_name, id}) => ({name: `${first_name} ${last_name}`, value: id}));
                    manager.push({name: "No Manager", value: null});
                    prompt([
                        {
                            type: "list",
                            name: "manager",
                            message: "Who is their manager?",
                            choices: managers
                        }
                    ])
                    .then(managerResponse => {
                        const manager = managerResponse.manager;
                        param.push(manager);
                        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                        VALUES (?, ?, ?, ?)`;
                        db.query(sql, param, (err) => {
                            if (err) {
                            throw err;
                            }
                            console.log("Employee added");
                            return viewEmployees();
                        });
                    });
                });
            });
        });
    });
};


module.exports = startSystem;