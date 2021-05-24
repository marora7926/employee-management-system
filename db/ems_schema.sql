-- drop databae with name ems_schema if already exist 
DROP DATABASE IF EXISTS employeedb;

-- create a dtaabase from scratch
CREATE DATABASE employeedb;

-- use the existing database just created
USE employeedb;

-- create a table with a name "department", defining variable within this table and defining property of each of the variables 
CREATE TABLE department (
  d_id INTEGER AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (d_id)
);

-- create a table with a name "role"
CREATE TABLE role (
  r_id INT AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(6) NOT NULL,
  d_id INT NOT NULL,
  PRIMARY KEY (r_id),
  FOREIGN KEY (d_id) REFERENCES department(d_id)
);

-- create a table with a name "employee"
CREATE TABLE employee (
  e_id INT AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  r_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (e_id),
  FOREIGN KEY (r_id) REFERENCES role(r_id)
);