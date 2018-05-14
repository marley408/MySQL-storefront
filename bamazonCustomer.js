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
  showAll()
}); 

//display all of the items available for sale
function showAll(){
  connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error;
    console.log('Here are all items available for purchase:')
    console.log(results)

    inquirer.prompt([
      {
        type:"rawlist",
        name: "buyOrGo",
        message: "Are you ready to checkout?",
        choices: ["Yes", "Didnt see anything I want!"],
      },
    ]).then(function(answer){
      if(answer.buyOrGo === 'Yes'){
        checkout()
      }
      else {
        console.log('Good-bye!')
      }
    })
  });
}


function checkout(){

  inquirer.prompt([ //prompt returns unresolved promise
  {
    type:"input",
    name: "id",
    message: "Enter product ID",
  },
  {
    type:"input",
    name: "quantity",
    message: "How many units would you like to buy?",
  },
  ]).then(function(answers){ //.then resolves the promise
    // answers => { id: '1', quantity: '10' }
    connection.query(`SELECT * FROM products WHERE item_id = ${parseInt(answers.id)}`, function (error, results, fields) {
      if (error) throw error;
      const product = results[0];

      if (product.stock_quantity < parseInt(answers.quantity)) {
        console.log(`${product.product_name} has insufficient quantity!`);
        return;
      }

      const updatedQty = product.stock_quantity - parseInt(answers.quantity);
      connection.query(`UPDATE products SET products.stock_quantity = ${parseInt(updatedQty)} WHERE products.item_id = ${parseInt(answers.id)}`, function(error, results) {
        if (error) throw error
        console.log(`Updated Inventory for ${product.product_name} is ${updatedQty} units`)
        console.log(`Your total is $ ${product.price * answers.quantity}`)
      })



    });
  })
}





