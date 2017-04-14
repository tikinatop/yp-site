var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	Hotel = require("./models/hotel"),
	Commentaire = require("./models/commentaire"),
	// User = require("./models/user"),
	seedDB = require("./seeds")
	;


mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
seedDB();



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
			res.render("hotels/index",{hotels:allHotels});
		}
	});
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
});


//NEW - show form to create new hotel
app.get("/hotels/new",function(req,res){

	res.render("hotels/new");
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
		res.render("hotels/show", {hotel:foundHotel});	
		}
	});
});

// ========================
// COMMENTS ROUTES
// ========================

app.get("/hotels/:id/commentaires/new",function(req, res){
	// find hotel by id
	Hotel.findById(req.params.id, function(err, hotel){
		if (err) {
			console.log(err);
		} else {
			res.render("commentaires/new", {hotel:hotel});
		}
	});
});

app.post("/hotels/:id/commentaires",function(req, res){
	//lookup hotel using ID
	Hotel.findById(req.params.id, function(err, hotel){
		if (err) {
			console.log(err);
			res.redirect("/hotels");
		} else {
			// create new comment
			Commentaire.create(req.body.commentaire, function(err, commentaire){
				if (err){
					console.log(err);
				} else {
					// connect new comment to hotel
					hotel.commentaires.push(commentaire);
					hotel.save();
					// redirect hotel show page
					res.redirect("/hotels/"+hotel._id);
				}
			})
		}
	})
});


app.listen(3000,function(){
	console.log("The YelpCamp Server has started.");
});
