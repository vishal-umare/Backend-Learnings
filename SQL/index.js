const { faker } = require('@faker-js/faker');
const mysql      = require('mysql2');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'delta_app'
});

// Inserting New Data 
let q = "INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)" ;
let users = ["123", "123_newuser", "abc@gmail.com", "abc"]

try{
    connection.query(q, users, (error, results) =>{
    if(error) throw error ;
    console.log(results)
    }) 
}
catch(error){
    console.log(error);
}

connection.end();



let getRandomUser = ()=> {
  return {
    id: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

// console.log(getRandomUser());
