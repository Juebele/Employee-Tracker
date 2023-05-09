const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');



const PORT = process.env.PORT || 3306;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connection = mysql.createConnection(
  {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'employees_db',
  },
  console.log(`Connected to the employees_db database.`)
);

inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter a name',
    },
  ])
  // .prompt([
  //   {
  //     type: 'list',
  //     name: 'department',
  //     message: 'select a department',
  //   },
  // ])
  .then((answers) => {
    const name = answers.name;
    const sq1 = `INSERT INTO employee_names (name) VALUES ('${answers.name}')`;

    // console.log(department);

    connection.query(sq1, (err, result) => {
      if (err) throw err;
      console.log('1 row inserted');
    });
  });

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});