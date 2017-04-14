var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	Hotel = require("./models/hotel"),
	// Commentaire = require("./models/commentaire"),
	// User = require("./models/user"),
	seedDB = require("./seeds")
	;


mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
seedDB();

// Hotel.create(
// 	{
// 	name: "Granite Hill" , image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg",
// 	description:"This is a huge granite hill, no bathrooms, no water. Beautiful granite!!"
// 	}, function(err,hotel){
// 		var result = (err) ? err : "Newly created hotel.\n" + hotel;
// 		console.log(result);
// });


	// var hotels = [
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

//INDEX - show all hotels
app.get("/hotels", function(req,res){
	// Get all hotels from DB
	Hotel.find({}, function(err,allHotels){
		if (err) {
			console.log(err);
		} else {
			res.render("index",{hotels:allHotels});
		}
	});
	// res.render("hotels",{hotels: hotels});
});

//Add new hotel to database
app.post("/hotels", function(req,res){
	// get data from form and add to hotels array
	var newHotel = {
		name: req.body.name,
		image: req.body.image,
		description: req.body.description
	};
	// Create a new hotel and save to DB
	Hotel.create(newHotel,function(err,newlyCreated){
		if (err) {
			console.log(err);
		} else {
			res.redirect("/hotels");
		}
	});
	// redirect back to hotels page
	// res.redirect("/hotels");
	// res.send("hit the post route");
});


//NEW - show form to create new hotel
app.get("/hotels/new",function(req,res){

	res.render("new");
});

// SHOW - shows more info about one hotel
app.get("/hotels/:id",function(req,res){
	// find the hotel with provided ID
	// Mongoose method FindById
	Hotel.findById(req.params.id).populate("commentaires").exec(function(err, foundHotel){
		if(err){
			console.log(err);
		} else {
			console.log(foundHotel);
		// render show template with that hotel
		res.render("show", {hotel:foundHotel});	
		}
	});
})

app.listen(3000,function(){
	console.log("The YelpCamp Server has started.");
});
