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

