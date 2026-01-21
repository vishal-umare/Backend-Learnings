const express = require("express")
const app = express()
const port = 4000;
const path = require("path")
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));


let posts  =[
    {
        id: uuidv4(),
        username : "vishal",
        content :"I love coding"
    },
    {
        id: uuidv4(),
        username : "harsh",
        content :"hardwork is needed for success"
    },
    {
        id: uuidv4(),
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
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts")                           //new info REDIRECT to main page 
})


// SHOW ROUTE(IMPLEMETNT: GET/POSTS/:ID)
app.get("/posts/:id", (req,res) =>{
    let {id} = req.params ;
    let post = posts.find( (p)=> id === p.id );
    res.render("show.ejs" , {post})
})


// UPDATE ROUTE(IMPLEMETNT: PATCH/POSTS/:ID)
app.patch("/posts/:id" ,(req,res) =>{
    let {id} = req.params ;
    let newContent = req.body.content;
    let post = posts.find( (p)=> id === p.id );
    post.content = newContent;
    console.log(post)
    res.send("patch is working")
})

app.listen(port, ()=>{
    console.log("Listening to the port");
})
