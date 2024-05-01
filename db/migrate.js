const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL server: ", err);
    return;
  }
  console.log("Connected to MySQL server.");
});

const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`;

console.log("Creating user table...");

connection.query(createUserTableQuery, (err, result) => {
  if (err) {
    console.error("Error creating table: ", err);
    connection.end();
    return;
  }
  console.log("User table created");

  connection.end();
});
