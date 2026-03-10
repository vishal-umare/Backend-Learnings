const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UrlRoute = require("./routes/UrlRoute")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

main()
.then(res => console.log("connection success"))
.catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/short-url")
}

app.use("/url", UrlRoute)

app.listen(8001, ()=>{
    console.log("Server started at port 8001");
})

