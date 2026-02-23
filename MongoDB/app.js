const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

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

app.listen(8080, () => {
  console.log("server is listening");
});
