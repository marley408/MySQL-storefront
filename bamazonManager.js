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
  // showAll()
}); 


inquirer.prompt([
  {
    type:"list",
    name: "options",
    message: "Select an option",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
  },
]).then(function(answer){
  if(answer.options === "View Products for Sale"){
    viewAll()
  }
  else if(answer.options === "View Low Inventory"){
    lowInventory()
  }
  else if(answer.options === "Add to Inventory"){
    addInventory()
  }
  else if(answer.options === "Add New Product"){
    addProduct()
  }
})


function viewAll(){
  connection.query('SELECT * FROM products WHERE stock_quantity >= 1', function (err, res){
    if (err) throw err
    console.log('Here are all items available for purchase:')
    console.log(res)   
  })
}


function lowInventory(){
  connection.query(`SELECT * FROM products WHERE stock_quantity <5`, function (error, results){

    console.log(`These items have low inventory:`)

    for(var i= 0; i < results.length; i++){

      console.log(results[i].product_name)
    }
    
})} 


function addInventory(){
  inquirer.prompt([
    {
      type:"input",
      name: "id",
      message: "Enter item id",
    },
    {
      type:"input",
      name: "quantity",
      message: "Enter quantity to add",
    }
  ]).then(function(answers){
    
    
    connection.query(`SELECT * FROM products WHERE item_id = ${parseInt(answers.id)}`, function(error, results) {
      if (error) throw error;

      const product = results[0];

      const addMore = parseInt(product.stock_quantity) + parseInt(answers.quantity);
      connection.query(`UPDATE products SET products.stock_quantity = ${addMore} WHERE products.item_id = ${parseInt(answers.id)}`, function(error, results){
        if (error) throw error
        console.log(results)
        console.log(`${answers.quantity} items were added to ${product.product_name} inventory`)
      });
    });

    
  })
}



function addProduct(){
  inquirer.prompt([
    {
      type:"input",
      name: "name",
      message: "Enter product name",
    },
    {
      type:"input",
      name: "department",
      message: "Enter department name",
    },
    {
      type:"input",
      name: "price",
      message: "Enter price",
    },
    {
      type:"input",
      name: "quantity",
      message: "Enter stock quantity",
    }
  ]).then(function(answers){
    connection.query(`INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("${answers.name}", "${answers.department}", "${parseInt(answers.price)}", "${parseInt(answers.quantity)}")`, function(error, results){
      if (error) throw error

      console.log(`New product, ${answers.name}, successfully added!`)
    })
  })
}
