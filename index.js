var express = require("express");
var cors = require("cors");
const mysql = require("mysql2");
var app = express();
require('dotenv').config()

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

app.use(cors());

app.get("/helloworld", function (req, res, next) {
  res.json({ msg: "Hello World" });
});

app.get("/attractions", function (req, res, next) {
  
  try {
    connection.query(
      "SELECT * FROM attractions",
      function (err, results, fields) {
        res.json(results);
      }
    );
  } catch (error) {
    res.json(error);
  }
});

app.listen(5000, function () {
  console.log("Web server listening on port 5000");
});
