const mongoose = require("mongoose");

main()
  .then(() => {
    console.log("Connection success");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);

// InsertOne
// const user1 = new User({
//   name: "adam",
//   email: "adam@goggle",
//   age: 45
// })

// user1.save();

// InsertMany
// User.insertMany([
//   { name: "tony", email: "tony@gmail.com", age: 50 },
//   { name: "bruce", email: "bruce@gmail.com", age: 30 },
//   { name: "peter", email: "peter@gmail.com", age: 47 },
// ]).then((res) => {
//   console.log(res);
// });

// Find
User.find({age: {$gt: 47 } }).then((res) => {
  console.log(res);
});
