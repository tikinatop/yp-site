var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose")
	;

mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name:String,
	image:String,
	description:String
});

var Campground = mongoose.model("Campground",campgroundSchema);

// Campground.create(
// 	{
// 	name: "Granite Hill" , image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg",
// 	description:"This is a huge granite hill, no bathrooms, no water. Beautiful granite!!"
// 	}, function(err,campground){
// 		var result = (err) ? err : "Newly created campground.\n" + campground;
// 		console.log(result);
// });


	// var campgrounds = [
	// {name: "Salmon Creek" , image:"https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"},
	// {name: "Granite Hill" , image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
	// {name: "Mountain Goat's Rest" , image:"https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg"},
	// {name: "Salmon Creek" , image:"https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"},
	// {name: "Granite Hill" , image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
	// {name: "Mountain Goat's Rest" , image:"https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg"},
	// {name: "Salmon Creek" , image:"https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"},
	// {name: "Granite Hill" , image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
	// {name: "Mountain Goat's Rest" , image:"https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg"}
	// ]

app.get("/", function(req,res){
	res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req,res){
	// Get all campgrounds from DB
	Campground.find({}, function(err,allCampgrounds){
		if (err) {
			console.log(err);
		} else {
			res.render("index",{campgrounds:allCampgrounds});
		}
	});
	// res.render("campgrounds",{campgrounds: campgrounds});
});

//Add new campground to database
app.post("/campgrounds", function(req,res){
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
	// redirect back to campgrounds page
	// res.redirect("/campgrounds");
	// res.send("hit the post route");
});


//NEW - show form to create new campground
app.get("/campgrounds/new",function(req,res){

	res.render("new");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id",function(req,res){
	// find the campground with provided ID
	// Mongoose method FindById
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
		// render show template with that campground
		res.render("show", {campground:foundCampground});	
		}
	});
})

app.listen(3000,function(){
	console.log("The YelpCamp Server has started.");
});