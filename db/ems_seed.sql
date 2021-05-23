use employeeDB;

-- Inserting data into department table
INSERT INTO department (name)
VALUES 
    ("Human Resources"), 
    ("Finance"), 
    ("Marketing"), 
    ("Information Technology"), 
    ("Research and Development");

SELECT * FROM employeedb.department;

-- Inserting data into role table
INSERT INTO role (title, salary, department_id)
VALUES
    ("HR Manager", 125000, 1),
    ("Recrutiment Officer", 60000, 1),
    ("Employee Relationship Officer", 55000, 1),
    ("Finance Manager", 130000, 2),  
    ("Auditor", 120000, 2),
    ("Accountant", 100000, 2),
    ("Marketing Manager", 125000, 3),
    ("Public Relations Officer", 100000, 3),
    ("IT Manager", 130000, 4),
    ("Support Specialist", 75000, 4),
    ("R&D Manager", 135000, 5),
    ("Research Officer", 80000, 5);

SELECT * FROM employeedb.role;

-- Inserting data into employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Michael', 'Scott', 1, NULL),
    ('Andy', 'Bernard', 2, 1),
    ('Angela', 'Martin', 3, 1),
    ('Creed', 'Bratoon', 4, NULL),
    ('Darryl', 'Philbin', 5, 2),
    ('Dwight', 'Schrute', 6, 2),
    ('Kelly', 'Kapoor', 7, NULL),
    ('Jim', 'Halpert', 8, 3),
    ('Meredith', 'Palmer', 8, 3),
    ('Oscar', 'Martinez', 9, NULL),
    ('Pam', 'Beesly', 10, 4),
    ('Gordon', 'Cameron', 11, NULL),
    ('Tom', 'Scott', 12, 5),
    ('Penni', 'Gilbert', 12, 5);

SELECT * FROM employeedb.employee;