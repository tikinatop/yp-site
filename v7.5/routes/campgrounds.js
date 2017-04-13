
var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//INDEX - show all campgrounds
router.get("/", function(req,res){
	// Get all campgrounds from DB
	Campground.find({}, function(err,allCampgrounds){
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/index",{campgrounds:allCampgrounds});
		}
	});
});

//CREATE - dd new campground to database
router.post("/", function(req,res){
	// get data from form and add to campgrounds array
	var newCampground = {
		name: req.body.name,
		image: req.body.image,
		description: req.body.description
	};
	// Create a new campground and save to DB
	Campground.create(newCampground,function(err,newlyCreated){
		if (err) {
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
});


//NEW - show form to create new campground
router.get("/new",function(req,res){

	res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
router.get("/:id",function(req,res){
	// find the campground with provided ID
	// Mongoose method FindById
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			console.log(foundCampground);
		// render show template with that campground
		res.render("campgrounds/show", {campground:foundCampground});	
		}
	});
});

module.exports = router;