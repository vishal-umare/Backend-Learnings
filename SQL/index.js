// const { faker } = require("@faker-js/faker");
// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: process.env.DB_PASSWORD,
//   database: "delta_app",
// });

// let getRandomUser = () => {
//   return {
//     id: faker.string.uuid(),
//     username: faker.internet.username(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//   };
// };

// let getRandomUser = () => {
//   return [
//     faker.string.uuid(),
//     faker.internet.username(),
//     faker.internet.email(),
//     faker.internet.password(),
//   ];
// };

// console.log(getRandomUser());

// Inserting New Data

// let q = "INSERT INTO users (id, username, email, password) VALUES ?";
// let users = ["123", "123_newuser", "abc@gmail.com", "abc"]

// let users = [
//   ["123b", "123_newuserb", "abc@gmail.comb", "abcb"],
//   ["123c", "123_newuserc", "abc@gmail.comc", "abcc"],
// ];

// Inserting 100 fake user
// let q = "INSERT INTO users (id, username, email, password) VALUES ?";

// let data = [];
// for(let i=1; i<=100; i++){
//   data.push(getRandomUser());
// }

// try {
//   connection.query(q, [data], (error, results) => {
//     if (error) throw error;
//     console.log(results);
//   });
// } catch (error) {
//   console.log(error);
// }

// connection.end();

// ---------------------------------------------------------------------------------------------------------------------------------------
// (Activity Routing )

const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "delta_app",
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// ROUTES
// Showing Total users count
app.get("/", (req, res) => {
  let q = `SELECT count(*) FROM users ;`
  try {
    connection.query(q, (error, result) => {
      if (error) throw error;
      // console.log(result);
      let count = result[0]["count(*)"] ;
      res.render("home.ejs", {count})
    });
  } 
  catch (error) {
    console.log(error);
    res.send("Some error in DB")
  }
});

// Showing users
app.get("/user", (req, res) =>{
  let q = `SELECT * FROM users ;`
  try {
    connection.query(q, (error, result) => {
      if (error) throw error;
      let users = result;
      res.render("showusers.ejs", {users})
    });
  } 
  catch (error) {
    console.log(error);
    res.send("Some error in DB")
  }
})

// Edit username
app.get("/user/:id/edit" ,(req,res)=>{
  let {id} = req.params ;
  let q = `SELECT * FROM users WHERE id = '${id}'`
  try {
    connection.query(q, (error, result) => {
      if (error) throw error;
      let user = (result[0]);
      res.render("edit.ejs", {user})
    });
  } 
  catch (error) {
    console.log(error);
    res.send("Some error in DB")
  }
})

// Update (DB) route
app.patch("/user/:id", (req,res)=>{
  let {id} = req.params ;
  let { password : formPass , username : newUsername} = req.body ;
  let q = `SELECT * FROM users WHERE id = '${id}'`

  try {
    connection.query(q, (error, result) => {
      if (error) throw error;
      let user = (result[0]);
      if(formPass =! user.password) {
        res.send("Wrong Password entered")
      }
      else{
        let q2 = `UPDATE users SET username='${newUsername}' WHERE id = '${id}'`
        connection.query(q2, (error, result)=>{
          if (error) throw error;
          res.redirect("/user")
        })
      }
    });
  } 
  catch (error) {
    console.log(error);
    res.send("Some error in DB")
  }
})

app.listen("8080", () => {
  console.log("App is listening on port 8080");
});

