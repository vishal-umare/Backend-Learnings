const express = require("express")
const app = express();

// console.dir(app);

let port = 3000 ;

app.listen(port , () =>{
    console.log(`App is listening ${port}`)
})

// app.use((req, res) =>{
//     console.log("Request received")

//     let code = "<h1>Fruits</h1> <ul><li>Apple</li><li>Banana</li></ul>"
//     res.send(code)
// })

// -----------------------------------------------------------
//ROUTING 

// app.get("/", (req, res) =>{
//     res.send("Hello , You contacted root path")
// })

// app.get("/apple", (req, res) =>{
//     res.send("You contacted apple path")
// })

// app.get("/orange", (req, res) =>{
//     res.send("You contacted orange path")
// })

// app.get(/.*$/, (req, res) => {
//     res.send("this path do not exist");
// });

// app.post("/", (req, res) => {
//     res.send("You sent POST request to root");
// });

// ---------------------------------------------------------------------
// PATH PARAMETERS

// app.get("/:username" , (req , res) =>{
//     console.log(req.params)
//     res.send("Hey welcome to root")
// })  

// app.get("/:username/:id" , (req , res) =>{
//     let { username , id} = req.params ;
//     res.send(`Welcome to profile of ${username}`)
// })  



// ---------------------------------------------------------------------
// QUERY STRINGS

// app.get("/search" , (req , res) =>{
//     console.log(req.query)
//     res.send("No Results")
// })  

app.get("/search" , (req , res) =>{
    let {q} = req.query ;
    res.send(`Search results for query- ${q}`)
})  