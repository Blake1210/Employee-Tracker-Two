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
        // switch(nextQuestion) {
        //     case "View all departments":
        //         viewDepartments();
        //       break;
        //     case "View all roles":
        //         viewRoles();
        //       break;
        //       case "View all employees":
        //         viewEmployees();
        //       break;
        //       case "Add a department":
        //         addDepartment();
        //       break;
        //       case "Add a roles":
        //       addRoles();
        //       break;
        //       case "Add a roles":
        //       addRoles();
        //       break;
        //       case "Add a roles":
        //       addRoles();
        //       break;
        //     default:
        //       // code block
        //   }
        
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

const addRoles = () => {
    return prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of this role?"
            // validate
        }
    ])
}

module.exports = startSystem;