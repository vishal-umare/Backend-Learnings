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

app.get("/rolldice" , (req,res) =>{
    let diceVal = Math.floor(Math.random() * 6) +1 ;
    res.render("rolldice.ejs" , {diceVal})
})


// Activity insta page
app.get("/ig/:username" , (req,res) =>{
    const followers = ["Adam", "Cris", "Bob", "Hadden"]
    let {username} = req.params ;
    res.render("instagram.ejs" , {username , followers})
})


app.listen(port , ()=>{
    console.log(`App listening on port ${port}`)
});