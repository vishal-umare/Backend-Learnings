

// const fs = require("fs");

// SYNC (READING THE FILE)
// const result = fs.readFileSync("./contacts.txt" , "utf-8");
// console.log(result);

// ASYNC (READING THE FILE)
// const result = fs.readFile("./contacts.txt" , "utf-8" ,(err, result) => {
//     if(err){
//         console.log("error occured",err);
//     } else{
//         console.log(result);
//     }
// });

// SYNCHRONOUS (APPENDING)

// fs.appendFileSync("./text.txt", `heyy there \n`)

// ---------------------------------------------------------------------------------------------

// **CREATING SIMPLE PROJECT

const express = require("express");
const app = express() ;
const users = require("./MOCK_DATA.json")
const PORT = 5000 ;


app.get("/api/users",(req,res) => {
    res.json(users);
})

app.get("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find( (user)=> user.id === id) ;
    res.json(user);
})

app.listen(PORT, ()=>{
    console.log(`App is listening on ${PORT}`)
})