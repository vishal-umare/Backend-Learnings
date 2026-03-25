const Listing = require("../models/listing.js");

// INDEX ROUTE
module.exports.indexRoute = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// NEW ROUTE
module.exports.newRoute = (req, res) => {
  res.render("listings/new.ejs");
};

// SHOW ROUTE
module.exports.showRoute = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).populate({path: "reviews", populate:{ path: "author"}, }).populate("owner");
  if(!listing){
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings"); 
  }
  res.render("listings/show.ejs", { listing });
};

// CREATE ROUTE
module.exports.createRoute = async (req, res, next) =>{
  // let { title, description, image, price, location, country} = req.body ;
    
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id ;
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

// EDIT ROUTE
module.exports.editRoute = async (req, res) =>{
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", {listing});
};

// UPDATE ROUTE
module.exports.updateRoute = async (req, res) =>{
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing});
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

// DELETE ROUTE
module.exports.deleteRoute = async (req, res) =>{
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
