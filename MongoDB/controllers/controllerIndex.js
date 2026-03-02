const Chat = require("../models/chat");

// INDEX ROUTE (SEE ALL CHATS)
async function handleGetAllChats(req, res) {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
}

// NEW ROUTE
async function handleGetNewChat(req, res) {
  res.render("new.ejs");
}

// CREATE ROUTE
async function handleCreateChats(req, res) {
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

  res.redirect("/chats");
}

// EDIT ROUTE
async function handleEditChat(req, res) {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
}

// UPDATE (PUT REQ)
async function handleUpdateChat(req, res) {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true, new: true },
  );
  console.log(updatedChat);
  res.redirect("/chats");
}

// DESTROY ROUTE
async function handleDeleteChat(req, res) {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
}

module.exports = {
  handleGetAllChats,
  handleCreateChats,
  handleGetNewChat,
  handleEditChat,
  handleUpdateChat,
  handleDeleteChat,
};
