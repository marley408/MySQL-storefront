var mysql = require("mysql");
var inquirer = require('inquirer')

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err
}); 


inquirer.prompt([
  {
    type:"list",
    name: "options",
    message: "Choose an option below",
    choices:["View Product Sales by Department", "Create New Department"]
  },
]).then(function(answers){
  if(answers.options === "View Product Sales by Department"){
    viewDept()
  }
  else{
    // newDept()
  }
})

function viewDept(){
  connection.query('')
}