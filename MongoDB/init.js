const mongoose = require("mongoose");
const Chat = require("./models/chat");

main()
  .then((res) => console.log("Connection Successfull"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
  {
    from: "Neha",
    to: "Priya",
    msg: "Hey , how are you?",
    created_at: new Date(),
  },
  {
    from: "Harsh",
    to: "Nikhil",
    msg: "Bring some water",
    created_at: new Date(),
  },
  {
    from: "Sujal",
    to: "Don",
    msg: "I am really tired ",
    created_at: new Date(),
  },
  {
    from: "Om",
    to: "Rishbh",
    msg: "I am coming for today's seminar",
    created_at: new Date(),
  },
  {
    from: "Akash",
    to: "Praful",
    msg: "Let's settle this thing",
    created_at: new Date(),
  },
  {
    from: "Monoj",
    to: "Pooja",
    msg: "Let's go for coffe date",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats);