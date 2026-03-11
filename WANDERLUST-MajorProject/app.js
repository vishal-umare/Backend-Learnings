const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connnected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
  res.send("Hiii");
});

// app.get("/testListing", async (req, res) =>{
//     const sample = new Listing({
//         title: "New Villa",
//         description: "Near costal area",
//         price: 12000,
//         location: "Paradise",
//         country: "Romania",
//     });
//     await sample.save();
//     console.log("Sample tested")
//     res.send("Testing W")
// })

app.get("/listings", (req, res) => {
  Listing.find({}).then((res) => console.log(res));
});

app.listen(8080, () => {
  console.log("App is listening on 8080");
});
