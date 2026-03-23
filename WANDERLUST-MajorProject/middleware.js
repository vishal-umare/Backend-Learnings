// CREATING MIDDLEWARES THAT CAN BE DIRECTLY USED.

// Login middleware
function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in to create new listing!");
    return res.redirect("/login");
  }
  next();
}

module.exports = { isLoggedIn, } 