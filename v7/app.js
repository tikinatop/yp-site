var express 			= require("express"),
	app 				= express(),
	bodyParser 			= require("body-parser"),
	mongoose 			= require("mongoose"),
	passport 			= require("passport"),
	LocalStrategy 		= require("passport-local"),
	Campground 			= require("./models/campground"),
	Comment 			= require("./models/comment"),
	User 				= require("./models/user"),
	seedDB 				= require("./seeds")
	;


// setup routes
var commentRoutes 		= require("./routes/comments"),
	campgroundRoutes 	= require("./routes/campgrounds"),
	indexRoutes 		= require("./routes/index")
	;

mongoose.connect("mongodb://localhost/yelp_camp_v7");
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

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);


app.listen(3000,function(){
	console.log("The YelpCamp Server has started.");
});