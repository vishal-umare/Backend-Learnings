const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");
const methodOverride = require('method-override');  


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

main()
  .then((res) => console.log("Connection Successfull"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// INDEX ROUTE (SEE ALL CHATS)
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});

// NEW ROUTE
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// CREATE ROUTE
app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });

  newChat
    .save()
    .then((res) => console.log("new chat saved"))
    .catch((err) => console.log(err));

  res.redirect("/chats")
});

// EDIT ROUTE
app.get("/chats/:id/edit", async (req,res) =>{
  let {id} = req.params ;
  let chat = await Chat.findById(id);
  res.render("edit.ejs",{chat})
})

// UPDATE (PUT REQ)
app.put("/chats/:id", async (req,res) =>{
  let {id} = req.params ;
  let {msg: newMsg} = req.body ;
  let updatedChat = await Chat.findByIdAndUpdate(id, {msg: newMsg}, {runValidators: true, new:true})
  console.log(updatedChat);
  res.redirect("/chats");
})

// DESTROY ROUTE
app.delete("/chats/:id", async (req,res) =>{
  let {id} = req.params ;
  let deletedChat = await Chat.findByIdAndDelete(id) ;
  console.log(deletedChat);
  res.redirect("/chats"); 
})

app.listen(8080, () => {
  console.log("server is listening");
});
