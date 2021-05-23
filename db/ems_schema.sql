-- drop databae with name ems_schema if already exist 
DROP DATABASE IF EXISTS employeeDB;

-- create a dtaabase from scratch
CREATE DATABASE employeeDB;

-- use the existing database just created
USE employeeDB;

-- create a table with a name "department", defining variable within this table and defining property of each of the variables 
CREATE TABLE department (
  id INTEGER AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- create a table with a name "role"
CREATE TABLE role (
  id INT AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(6) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

-- create a table with a name "employee"
CREATE TABLE employee (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id)
);

SELECT * FROM employeedb.department;
SELECT * FROM employeedb.employee;
SELECT * FROM employeedb.role;