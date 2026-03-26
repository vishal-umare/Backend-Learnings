const Listing = require("../models/listing.js");
const cloudinary = require("../cloudConfig");
const fs = require("fs");

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
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

// CREATE ROUTE
module.exports.createRoute = async (req, res, next) => {
  // 🔥 Upload image to Cloudinary
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "wanderlust_dev",
  });

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  // ✅ Save Cloudinary image URL
  newListing.image = {
    url: result.secure_url,
    filename: result.public_id,
  };

  await newListing.save();

  // 🧹 Delete temp file
  fs.unlinkSync(req.file.path);

  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

// EDIT ROUTE
module.exports.editRoute = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
};

// UPDATE ROUTE
module.exports.updateRoute = async (req, res) => {
    let { id } = req.params;

  // 🔹 Find existing listing
  let listing = await Listing.findById(id);

  // 🔹 Update text fields
  Object.assign(listing, req.body.listing);

  // 🔥 If user uploaded new image
  if (req.file) {
    // 🧹 Delete old image from Cloudinary
    await cloudinary.uploader.destroy(listing.image.filename);

    // ☁️ Upload new image
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "wanderlust_dev",
    });

    // 💾 Save new image
    listing.image = {
      url: result.secure_url,
      filename: result.public_id,
    };

    // 🧹 Delete temp file
    fs.unlinkSync(req.file.path);
  }

  // 🔹 Save updated listing
  await listing.save();
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

// DELETE ROUTE
module.exports.deleteRoute = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
