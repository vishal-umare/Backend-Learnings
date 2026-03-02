const express = require("express");

const router = express.Router();

const {handleGetAllChats,handleCreateChats,handleGetNewChat,handleEditChat,handleUpdateChat,handleDeleteChat} = require("../controllers/controllerIndex")

// INDEX ROUTE (SEE ALL CHATS)
router.get("/", handleGetAllChats);

// NEW ROUTE
router.get("/new", handleGetNewChat);

// CREATE ROUTE
router.post("/",handleCreateChats);

// EDIT ROUTE
router.get("/:id/edit",handleEditChat)

// UPDATE (PUT REQ)
router.put("/:id",handleUpdateChat)

// DESTROY ROUTE
router.delete("/:id", handleDeleteChat)

module.exports = router ;