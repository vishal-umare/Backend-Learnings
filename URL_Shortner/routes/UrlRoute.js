const express = require("express");
const { HandleGenerateNewShortUrl , handleGetAnalytics} = require("../controllers/urlController")

const router = express.Router();

router.post("/", HandleGenerateNewShortUrl)

router.get("/analytics/:shortID", handleGetAnalytics)

module.exports = router ; 