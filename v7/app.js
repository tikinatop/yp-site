var express 			= require("express"),
	app 				= express(),
	bodyParser 			= require("body-parser"),
	mongoose 			= require("mongoose"),
	passport 			= require("passport"),
	LocalStrategy 		= require("passport-local"),
	Hotel 			= require("./models/hotel"),
	Commentaire 			= require("./models/commentaire"),
	Utilisateur 				= require("./models/utilisateur"),
	seedDB 				= require("./seeds")
	;


// setup routes
var commentaireRoutes 		= require("./routes/commentaires"),
	hotelRoutes 	= require("./routes/hotels"),
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
passport.use(new LocalStrategy(Utilisateur.authenticate()));
passport.serializeUtilisateur(Utilisateur.serializeUtilisateur());
passport.deserializeUtilisateur(Utilisateur.deserializeUtilisateur());

// middleware permettant de passer une variable en plus à toutes les routes (res.render)
app.use(function(req, res, next) {
	res.locals.utilisateurActuel = req.utilisateur;
	next();
});

app.use(indexRoutes);
app.use(hotelRoutes);
app.use(commentaireRoutes);


app.listen(3000,function(){
	console.log("Le serveur Hotello a démarré.");
});
