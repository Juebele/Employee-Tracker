const mysql = require('mysql2');
const inquirer = require('inquirer');

const connection = mysql.createConnection(
  {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'employees_db',
  },
  console.log(`Connected to the employees_db database.`)
);

function viewDepartments () {
  connection.query('SELECT * FROM department', (err, result) => {
    if (err) throw err;
    console.table(result)
  })
}
function viewRoles () {
  connection.query('SELECT * FROM role', (err, result) => {
    if (err) throw err;
    console.table(result)
  })
}
function viewEmployees () {
  connection.query('SELECT * FROM employee', (err, result) => {
    if (err) throw err;
    console.table(result)
  })
}

function homeScreen () {inquirer.prompt([
  {
    type: 'list',
    name: 'function',
    message: 'select an action',
    choices: ['Add Department', 'Add Role', 'Add Employee', 'View Departments', 'View Roles', 'View Employees']
  }
])


.then((answers) => {
  switch(answers.function) {
    case 'Add Department':
      addDepartment();
      return;
    case 'Add Role':
      addRole();
      return;
    case 'Add Employee':
      addEmployee();
      return;
    case 'View Departments':
      viewDepartments();
      return;
    case 'View Roles':
      viewRoles();
      return;
    case 'View Employees':
      return;
  default:
    break;
  }
})
}

const addDepartment = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'department',
      message: 'Enter a department name',
    },
  ])

  .then((answers) => {
    const department = answers.department;
    const sq1 = `INSERT INTO department (name) VALUES ('${answers.department}')`;
    
    connection.query(sq1, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  })
}

const addRole = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter a job title',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary',
    },
    {
      type: 'input',
      name: 'departmentID',
      message: 'Enter a department ID',
    },
  ])

  .then((answers) => {
    const title = answers.title;
    const salary = answers.salary;
    const departmentID = answers.departmentID;
    const sq1 = `INSERT INTO role (title, salary, department_id) VALUES ('${answers.title}', '${answers.salary}', ${answers.departmentID})`;
    
    connection.query(sq1, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  })
}
const addEmployee = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter a first name',
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter a last name',
    },
    {
      type: 'input',
      name: 'roleID',
      message: 'Enter a role ID',
    },
    {
      type: 'input',
      name: 'managerID',
      message: 'Enter a manager',
    },
  ])

  .then((answers) => {
    const firstName = answers.firstName;
    const lastName = answers.lastName;
    // const sq2 = `INSERT INTO employee (last_name) VALUES ('${answers.lastName}')`;
    const role = answers.roleID;
    // const sq3 = `INSERT INTO employee (role_id) VALUES ('${answers.roleID}')`;
    const manager = answers.managerID;
    // const sq4 = `INSERT INTO employee (manager_id) VALUES ('${answers.managerID}')`;
    const sq1 = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.firstName}', '${answers.lastName}', ${answers.roleID}, ${answers.managerID})`;
    
    connection.query(sq1, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  })
}

homeScreen();

// addEmployee()

// viewDepartments()
// viewRoles()
// viewEmployees()