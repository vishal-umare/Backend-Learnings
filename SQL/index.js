const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "delta_app",
});

// let getRandomUser = () => {
//   return {
//     id: faker.string.uuid(),
//     username: faker.internet.username(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//   };
// };

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

console.log(getRandomUser());




// Inserting New Data

// let q = "INSERT INTO users (id, username, email, password) VALUES ?";
// let users = ["123", "123_newuser", "abc@gmail.com", "abc"]

// let users = [
//   ["123b", "123_newuserb", "abc@gmail.comb", "abcb"],
//   ["123c", "123_newuserc", "abc@gmail.comc", "abcc"],
// ];



// Inserting 100 fake user 
let q = "INSERT INTO users (id, username, email, password) VALUES ?";

let data = [];
for(let i=1; i<=100; i++){
  data.push(getRandomUser());
}


try {
  connection.query(q, [data], (error, results) => {
    if (error) throw error;
    console.log(results);
  });
} catch (error) {
  console.log(error);
}

connection.end();

