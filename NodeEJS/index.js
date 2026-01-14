const express = require("express")
const app = express()

let port = 4000;

app.set("view engine" , "ejs");

app.get("/" ,(req,res) =>{
    res.render("home.ejs")
})

// app.get("/" ,(req,res) =>{
//     res.send("server running displayed")
// })

app.listen(port , ()=>{
    console.log(`App listening on port ${port}`)
});