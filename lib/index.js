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
        if (nextQuestion === "View all departments") {
            viewDepartments();
        };

        if (nextQuestion === "View all roles") {
            viewRoles();
        };

        if (nextQuestion === "View all employees") {
            viewEmployees();
        };

        if (nextQuestion === "Add a department") {
            addDepartment();
        };

        if (nextQuestion === "Add a roles") {
            addRoles();
        };

        if (nextQuestion === "Add a employees") {
            addEmployees();
        };

        if (nextQuestion === "Update employee role") {
            updateEmployee();
        };

        if (nextQuestion === "Quit") {
        process.quit();
        };
    })
};

const viewDepartments = () => {
    const sql = `SELECT departments`;
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
    const sql = `SELECT roles.department_id,
        roles.title,
        roles.salary,
        departments.name`;
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
    const sql = `SELECT employees.id,
        employees.first_name,
        employees.last_name,
        employees.first_name,
        roles.title AS title,
        roles.salary AS salary,
        departments.name AS Department`;
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
        const sql = `INSERT INTO departments (NAME) VALUES (?)`
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