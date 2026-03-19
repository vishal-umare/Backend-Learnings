const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate")

const ExpressError = require("./utils/ExpressError.js")

// const Listing = require("./models/listing");
// const wrapAsync = require("./utils/wrapAsync.js");
// const {listingSchema, reviewSchema}  = require("./schema.js")
// const Review = require("./models/review.js");

const listingRoute = require("./routes/listingRoute.js");
const reviewRoute = require("./routes/reviewRouter.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")))

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


// ROUTES 
app.use("/listings", listingRoute) ;

// REVIEWS ROUTES
app.use("/listings/:id/reviews", reviewRoute);



// Error
app.use((req, res, next) =>{
  next(new ExpressError(404, "Page not found!"));
})

app.use((err, req, res, next) =>{
  let { statusCode=500, message="Something went wrong"} = err;
  res.status(statusCode).render("listings/error.ejs",{err})
})

app.listen(8080, () => {
  console.log("App is listening on 8080");
});


