const express = require("express")
const app = express()
const port = 4000;
const path = require("path")

app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));


let posts  =[
    {
        username : "vishal",
        content :"I love coding"
    },
    {
        username : "harsh",
        content :"hardwork is needed for success"
    },
    {
        username : "nikhil",
        content :"got my first internship"
    }
];

// INDEX ROUTE(IMPLEMENT:GET/POSTS)
app.get("/posts", (req, res) =>{
    res.render("index.ejs" , {posts})
})


// CREATE ROUTE(IMPLEMETNT: POST/POSTS)
app.get("/posts/new", (req,res) =>{
    res.render("new.ejs")
})

app.post("/posts", (req,res) =>{
    let {username , content} = req.body ;
    posts.push({ username, content });
    res.redirect("/posts")                           //new info REDIRECT to main page 
})



app.listen(port, ()=>{
    console.log("Listening to the port");
})
 