const express = require("express");
const { HandleGenerateNewShortUrl } = require("../controllers/urlController")

const router = express.Router();

router.post("/", HandleGenerateNewShortUrl)

module.exports = router ;