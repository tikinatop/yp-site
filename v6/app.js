var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	Hotel = require("./models/hotel"),
	Commentaire = require("./models/commentaire"),
	User = require("./models/user"),
	seedDB = require("./seeds")
	;


mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Once again Rusty wins",
	resave:false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware permettant de passer une variable en plus à totues les routes (res.render)
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

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

app.get("/hotels/:id/commentaires/new", isLoggedIn,function(req, res){
	// find hotel by id
	Hotel.findById(req.params.id, function(err, hotel){
		if (err) {
			console.log(err);
		} else {
			res.render("commentaires/new", {hotel:hotel});
		}
	});
});

app.post("/hotels/:id/commentaires", isLoggedIn,function(req, res){
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

// ===============
// AUTH ROUTES
// ===============
// show register form
app.get("/register",function(req, res){
	res.render("register");
});

// handle sign up logic
app.post("/register",function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if (err) {
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/hotels");
		});
	});
});

//show login form
app.get("/login",function(req, res){
	res.render("login");
});

// handle login logic
// app.post("/login", middleware, callback)
app.post("/login", passport.authenticate("local",
	{
		successRedirect: "/hotels",
		failureRedirect: "/login"
	}) ,function(req, res){
});

// logout route
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/hotels");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

app.listen(3000,function(){
	console.log("The YelpCamp Server has started.");
});
