CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price INT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rubber Ducky", "Toys", "1", "100");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "Electronics", "600", "50");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blanket", "Home", "12", "30");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bike", "Outdoor", "90", "25");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Printer", "Electronics", "35", "80");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Basketball", "Sports", "14", "100");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fishing pole", "Outdoor", "15", "75");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tonka truck", "Toys", "10", "30");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pillow", "Home", "10", "60");


 

SELECT * FROM products 