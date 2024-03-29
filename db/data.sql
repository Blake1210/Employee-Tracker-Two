USE company;
INSERT INTO DEPARTMENTS (department_name)
VALUES
("Marketing"),
("Operations"),
("Human Resources"),
("Sales");

INSERT INTO roles (title, salary, department_id)
VALUES
("Head of Marketing", 120000, 1),
("Marketing Associate", 70000, 1),
("Head of Operations", 110000, 2),
("Supply Chain Manager", 8000, 2),
("Recruiter", 75000, 3),
("Sales Manager", 15000, 4),
("Account Manager", 120000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("Jon", "Snow", 1, NULL),
("Samwell", "Tarley", 2, 1),
("Tyrion", "Lannister", 3, NULL),
("Jorah", "Mormont", 4, 3),
("Brienne", "Tarth", 5, NULL),
("Robb", "Stark", 6, NULL),
("Arya", "Stark", 7, 5);
